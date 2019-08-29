import { grpc } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

import {
    ObjectMetadata,
    ClientCacheResponseL1,
    ClientCacheResponseL2,
    ClientCacheRequest,
    ClientCacheResponseData,
    ContentRequest,
    ContentResponse,
    BlockKey,
    TicketBundleRemainder,
    TicketL2Info,
    ColocationPuzzleInfo,
    NetworkAddress,
    CacheInfo,
    TicketBundle,
    PublicKey
} from './proto/cachecash_pb';
import * as util from './digest';
import { Puzzle, Parameters } from './puzzle';
import { ClientPublisher, ClientCache } from './proto/cachecash_pb_service';
import { decryptTicketL2 } from './common';

export class DataObject {
    data: Uint8Array;

    constructor(data: Uint8Array) {
        this.data = data;
    }
}

export class ChunkGroup {
    data: Uint8Array[];
    blockIdx: number[];
    metadata: ObjectMetadata;

    constructor(data: Uint8Array[], blockIdx: number[], metadata: ObjectMetadata) {
        this.data = data;
        this.blockIdx = blockIdx;
        this.metadata = metadata;
    }
}

export class ChunkRequest {
    bundle: TicketBundle;
    idx: number;

    encData?: Uint8Array;
    err?: Error;

    constructor(bundle: TicketBundle, idx: number, encData?: Uint8Array, err?: Error) {
        this.bundle = bundle;
        this.idx = idx;
        this.encData = encData;
        this.err = err;
    }
}

function calculateChunkCount(m: ObjectMetadata): number {
    return Math.ceil(m.getObjectSize() / m.getChunkSize());
}

// XXX: this is a naive way to turn the NetworkAddress into an url
function networkaddr2http(addr: NetworkAddress): string {
    const buf = addr.getInetaddr_asU8();
    const port = addr.getPort() + 443; // TODO: mapping grpc addr to grpc-web
    return `http://${buf[0]}.${buf[1]}.${buf[2]}.${buf[3]}:${port}`;
}

// this function is only used to pretty print
function stringify(x: Uint8Array | ArrayBuffer): string {
    let y = 'new Uint8Array[';
    y += new Uint8Array(x).join(', ');
    y += '];';
    return y;
}

// we don't manage connections in the browser, this is done automatically
// just wrap around the remote addr
class CacheConnection {
    addr: string;

    constructor(addr: string) {
        this.addr = addr;
    }

    getRemote(): string {
        return this.addr;
    }
}

export class Bundle {
    path: string;
    bundle: TicketBundle;
    caches: CacheConnection[];
    rangeBegin: number;

    constructor(path: string, bundle: TicketBundle, caches: CacheConnection[], rangeBegin: number) {
        this.path = path;
        this.bundle = bundle;
        this.caches = caches;
        this.rangeBegin = rangeBegin;
    }

    // assume all blocks are full
    private estimatedBundleLength(): number {
        const m = this.bundle.getMetadata() as ObjectMetadata;
        return this.caches.length * m.getChunkSize();
    }

    blockSize(): number {
        const m = this.bundle.getMetadata() as ObjectMetadata;
        return m.getChunkSize();
    }

    objectSize(): number {
        const m = this.bundle.getMetadata() as ObjectMetadata;
        return m.getObjectSize();
    }

    remainingChunks(): number {
        const m = this.bundle.getMetadata() as ObjectMetadata;
        const remainingBytes = m.getObjectSize() - this.rangeBegin - this.estimatedBundleLength();

        if (remainingBytes > 0) {
            return Math.ceil(remainingBytes / m.getChunkSize());
        } else {
            return 0;
        }
    }

    chunkRangeBegin(): number {
        const m = this.bundle.getMetadata() as ObjectMetadata;
        return Math.ceil(this.rangeBegin / m.getChunkSize());
    }

    // XXX: only use this if you know there are blocks remaining
    nextRangeBegin(): number {
        return this.rangeBegin + this.estimatedBundleLength();
    }
}

export class Client {
    private publisher: string;
    private bundleBacklog: Bundle[];

    private publicKey: PublicKey;
    private privateKey: Uint8Array;

    constructor(publisher: string, publicKey: PublicKey, privateKey: Uint8Array) {
        this.publisher = publisher;
        this.bundleBacklog = [];

        this.publicKey = publicKey;
        this.privateKey = privateKey;

        // detect-node import doesn't work correctly for some reason
        if (Object.prototype.toString.call(global.process) === '[object process]') {
            console.log('node detected');
            // TODO: remove this when building for browsers
            grpc.setDefaultTransport(NodeHttpTransport());
        } else {
            console.log('browser detected');
        }
    }

    async getFirstBundle(path: string): Promise<Bundle> {
        // TODO: fetch bundles less aggressively
        while (this.bundleBacklog.length < 1) {
            await this.fetchMoreBundles(path, 0);
        }
        return this.bundleBacklog.shift() as Bundle;
    }

    async getFollowupBundle(previous: Bundle): Promise<Bundle> {
        // TODO: fetch bundles less aggressively
        while (this.bundleBacklog.length < 1) {
            await this.fetchMoreBundles(previous.path, previous.nextRangeBegin());
        }
        return this.bundleBacklog.shift() as Bundle;
    }

    private async fetchMoreBundles(path: string, rangeBegin: number): Promise<void> {
        const bundles = await this.getBundleInternal(path, rangeBegin);
        this.bundleBacklog = this.bundleBacklog.concat(bundles);
    }

    private async getBundleInternal(path: string, rangeBegin: number): Promise<Bundle[]> {
        const req = new ContentRequest();
        req.setClientPublicKey(this.publicKey);
        req.setPath(path);
        req.setRangeBegin(rangeBegin);
        req.setRangeEnd(0); // "continue to the end of the object"
        console.log('sending content request to publisher:', req);

        const resp = await this.grpcGetContent(this.publisher, req);
        const bundles = resp.getBundlesList();
        console.log('got tickets from publisher: ', bundles.length);

        return bundles.map(b => {
            const caches = b.getCacheInfoList().map((ci: CacheInfo) => {
                let url = networkaddr2http(ci.getAddr() as NetworkAddress);
                return new CacheConnection(url);
            });

            const meta = b.getMetadata() as ObjectMetadata;
            const chunksize = meta.getChunkSize();
            const chunks = b.getTicketRequestList().length;

            const bundle = new Bundle(path, b, caches, rangeBegin);
            rangeBegin += chunks * chunksize;
            return bundle;
        });
    }

    async fetchBundle(b: Bundle): Promise<ChunkGroup> {
        let bundle = b.bundle;

        console.log('requesting blocks from caches');
        let requests = b.caches.map((cc, i: number) => {
            let blockRequest = new ChunkRequest(bundle, i);
            return this.requestChunk(cc, blockRequest);
        });

        let responses = await Promise.all(requests);
        console.log('got singly-encrypted data from each cache');

        // Solve colocation puzzle
        let singleEncryptedChunks = responses.map(response => response.encData as Uint8Array);

        let rem = bundle.getRemainder() as TicketBundleRemainder;
        let pi = rem.getPuzzleInfo() as ColocationPuzzleInfo;

        let parameters = new Parameters(pi.getRounds(), pi.getStartOffset(), pi.getStartRange());
        let puzzle = new Puzzle(
            pi.getGoal_asU8(),
            new Uint8Array(),
            pi.getStartOffset(),
            parameters
        );

        console.log('Solving puzzle');
        console.time('Puzzle solved');
        // TODO: rangeBegin, rangeEnd missing?
        let solution = puzzle.solve(parameters, singleEncryptedChunks);
        console.timeEnd('Puzzle solved');

        // Decrypt L2 ticket
        let ticketL2 = decryptTicketL2(
            solution.secret,
            new Uint8Array(bundle.getEncryptedTicketL2_asU8())
        );

        // Send the L2 ticket to each cache.
        // XXX: This should not be serialized.
        let promises = b.caches.map(async (cc: CacheConnection) => {
            let tl2info = new TicketL2Info();
            tl2info.setEncryptedTicketL2(bundle.getEncryptedTicketL2());
            tl2info.setPuzzleSecret(solution.secret);

            let req = util.buildClientCacheRequest(bundle, tl2info);
            await this.grpcExchangeTicketL2(cc.getRemote(), req);
        });
        await Promise.all(promises);

        // Decrypt singly-encrypted blocks to produce final plaintext.
        let plaintextChunks: Uint8Array[] = [];
        let blockIdx: number[] = [];

        let rangeBegin = b.chunkRangeBegin();
        for (let i = 0; i < singleEncryptedChunks.length; i++) {
            let ciphertext = singleEncryptedChunks[i];

            let plaintext = util.encryptChunk(
                bundle.getTicketRequestList()[i].getChunkIdx(),
                (bundle.getRemainder() as TicketBundleRemainder).getRequestSequenceNo(),
                ticketL2.getInnerSessionKeyList()[i].getKey_asU8(),
                ciphertext
            );

            plaintextChunks.push(plaintext);
            blockIdx.push(bundle.getTicketRequestList()[i].getChunkIdx());

            // XXX: maybe get rid of this check
            if (blockIdx[i] !== rangeBegin + i) {
                throw new Error(
                    `block at position ${i} has index ${blockIdx[i]}, but expected ${rangeBegin +
                        i} `
                );
            }
        }

        console.log('block-group fetch completed without error');
        return new ChunkGroup(plaintextChunks, blockIdx, bundle.getMetadata() as ObjectMetadata);
    }

    // this function is supposed to be an example, you most likely want to do this yourself
    async getWholeObject(path: string): Promise<Uint8Array> {
        let bundle = await this.getFirstBundle(path);

        let offset = 0;
        let data = new Uint8Array(bundle.objectSize());

        while (true) {
            let bg = await this.fetchBundle(bundle);
            offset = this.mergeChunkGroup(data, offset, bg);

            if (bundle.remainingChunks()) {
                bundle = await this.getFollowupBundle(bundle);
            } else {
                break;
            }
        }

        return data;
    }

    mergeChunkGroup(buffer: Uint8Array, offset: number, bg: ChunkGroup): number {
        for (let i = 0; i < bg.data.length; i++) {
            buffer.set(bg.data[i], offset);
            offset += bg.data[i].length;
        }
        return offset;
    }

    // TODO: cc is unused?
    private async requestChunk(cc: CacheConnection, b: ChunkRequest): Promise<ChunkRequest> {
        // Send request ticket to cache; await data.
        let reqData = util.buildClientCacheRequest(
            b.bundle,
            b.bundle.getTicketRequestList()[b.idx]
        );
        console.log('fetching from cache: ', cc.getRemote());
        let msgData = await this.grpcGetChunk(cc.getRemote(), reqData);
        console.log('got data response from cache (in bytes)', msgData.getData_asU8().length);

        // Send L1 ticket to cache; await outer decryption key.
        let reqL1 = util.buildClientCacheRequest(b.bundle, b.bundle.getTicketL1List()[b.idx]);
        let msgL1 = await this.grpcExchangeTicketL1(cc.getRemote(), reqL1);
        console.log('got L1 response from cache');

        // Decrypt data
        let encData = util.encryptChunk(
            b.bundle.getTicketRequestList()[b.idx].getChunkIdx(),
            (b.bundle.getRemainder() as TicketBundleRemainder).getRequestSequenceNo(),
            (msgL1.getOuterKey() as BlockKey).getKey_asU8(),
            msgData.getData_asU8()
        );
        b.encData = encData;

        return b;
    }

    private grpcGetContent(remote: string, request: ContentRequest): Promise<ContentResponse> {
        console.log('Fetching content');
        return new Promise((resolve, reject) => {
            try {
                grpc.invoke(ClientPublisher.GetContent, {
                    request,
                    host: remote,
                    onEnd: this.onEnd(reject),
                    onMessage: (response: ContentResponse) => {
                        resolve(response);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    private grpcGetChunk(
        remote: string,
        request: ClientCacheRequest
    ): Promise<ClientCacheResponseData> {
        console.log('Fetching block');
        return new Promise((resolve, reject) => {
            try {
                grpc.invoke(ClientCache.GetChunk, {
                    request,
                    host: remote,
                    onEnd: this.onEnd(reject),
                    onMessage: (response: ClientCacheResponseData) => {
                        resolve(response);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    private grpcExchangeTicketL1(
        remote: string,
        request: ClientCacheRequest
    ): Promise<ClientCacheResponseL1> {
        console.log('Exchanging Ticket L1');
        return new Promise((resolve, reject) => {
            try {
                grpc.invoke(ClientCache.ExchangeTicketL1, {
                    request,
                    host: remote,
                    onEnd: this.onEnd(reject),
                    onMessage: (response: ClientCacheResponseL1) => {
                        resolve(response);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    private grpcExchangeTicketL2(
        remote: string,
        request: ClientCacheRequest
    ): Promise<ClientCacheResponseL2> {
        console.log('Exchanging Ticket L2');
        return new Promise((resolve, reject) => {
            try {
                grpc.invoke(ClientCache.ExchangeTicketL2, {
                    request,
                    host: remote,
                    onEnd: this.onEnd(reject),
                    onMessage: (response: ClientCacheResponseL2) => {
                        resolve(response);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    private onEnd(
        reject: (reason: {
            code: grpc.Code;
            msg: string | undefined;
            trailers: grpc.Metadata;
        }) => void
    ): (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => void {
        return (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
            if (code !== grpc.Code.OK) {
                console.log('gRPC error:', code, msg, trailers);
                reject({ code, msg, trailers });
            }
        };
    }
}

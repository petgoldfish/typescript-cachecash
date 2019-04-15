import { grpc } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import isNode from 'detect-node';

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
import * as util from './util';
import { Puzzle, Parameters } from './puzzle';
import { ClientPublisher, ClientCache } from './proto/cachecash_pb_service';
import { decryptTicketL2 } from './common';

export class DataObject {
    data: Uint8Array;

    constructor(data: Uint8Array) {
        this.data = data;
    }
}

export class BlockGroup {
    data: Uint8Array[];
    blockIdx: number[];
    metadata: ObjectMetadata;

    constructor(data: Uint8Array[], blockIdx: number[], metadata: ObjectMetadata) {
        this.data = data;
        this.blockIdx = blockIdx;
        this.metadata = metadata;
    }
}

export class BlockRequest {
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

function calculateBlockCount(m: ObjectMetadata): number {
    return Math.ceil(m.getObjectSize() / m.getBlockSize());
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

export class Client {
    private publisher: string;

    private publicKey: PublicKey;
    private privateKey: Uint8Array;

    // private caches: Map<string, CacheConnection>;

    constructor(publisher: string, publicKey: PublicKey, privateKey: Uint8Array) {
        this.publisher = publisher;

        this.publicKey = publicKey;
        this.privateKey = privateKey;

        // this.caches = new Map();

        // detect-node import doesn't work correctly for some reason
        if (Object.prototype.toString.call(global.process) === '[object process]') {
            console.log('node detected');
            grpc.setDefaultTransport(NodeHttpTransport());
        } else {
            console.log('browser detected');
        }
    }

    async getObject(path: string): Promise<DataObject> {
        let blockSize = 0;
        let rangeBegin = 0; // this is in chunks
        let remainingChunks = 1; // we expect at least one chunk

        let data;
        let offset = 0;

        while (remainingChunks > 0) {
            // XXX: `rangeBegin` here must be in bytes.
            let bg = await this.requestBlockGroup(path, rangeBegin * blockSize);

            if (!data) {
                data = new Uint8Array(bg.metadata.getObjectSize());
            }

            for (let i = 0; i < bg.data.length; i++) {
                if (bg.blockIdx[i] !== rangeBegin + i) {
                    throw new Error(
                        `block at position ${i} has index ${
                            bg.blockIdx[i]
                        }, but expected ${rangeBegin + i} `
                    );
                }

                data.set(bg.data[i], offset);
                offset += bg.data[i].length;
            }

            rangeBegin += bg.data.length;
            blockSize = bg.metadata.getBlockSize();
            remainingChunks = calculateBlockCount(bg.metadata) - rangeBegin;
        }

        return new DataObject(data as Uint8Array);
    }

    async requestBlockGroup(path: string, rangeBegin: number): Promise<BlockGroup> {
        const req = new ContentRequest();
        req.setClientPublicKey(this.publicKey);
        req.setPath(path);
        req.setRangeBegin(rangeBegin);
        req.setRangeEnd(0); // "continue to the end of the object"
        console.log('sending content request to publisher:', req);

        const resp = await this.grpcGetContent(this.publisher, req);
        const bundle = resp.getBundle() as TicketBundle;
        console.log('got ticket from publisher');

        const cacheConnections = bundle.getCacheInfoList().map((ci: CacheInfo, i: number) => {
            let url = networkaddr2http(ci.getAddr() as NetworkAddress);
            let cc = new CacheConnection(url);
            return cc;
        });

        console.log('requesting blocks from caches');

        let requests = cacheConnections.map((cc, i: number) => {
            /*
    cid := (cacheID)(bundle.CacheInfo[i].Addr.ConnectionString())

    cc, ok := cl.cacheConns[cid]
    if !ok {
      var err error
      // XXX: It's problematic to pass ctx here, because canceling the context will destroy the cache connections!
      // (It should only cancel this particular block-group request.)
      cc, err = newCacheConnection(context.Background(), cl.l, bundle.CacheInfo[i].Addr.ConnectionString())
      if err != nil {
          return nil, errors.Wrap(err, "failed to connect to cache")
      }
      cl.cacheConns[cid] = cc
    }
    cacheConns = append(cacheConns, cc)

    blockResults[i] = &blockRequest{
      bundle: bundle,
      idx:    i,
    }
    go cl.requestBlock(ctx, cc, blockResults[i], blockResultCh)
    */

            let blockRequest = new BlockRequest(bundle, i);
            return this.requestBlock(cc, blockRequest);
        });

        let responses = await Promise.all(requests);
        console.log('got singly-encrypted data from each cache');

        // Solve colocation puzzle
        let singleEncryptedBlocks = responses.map(response => response.encData as Uint8Array);

        let rem = bundle.getRemainder() as TicketBundleRemainder;
        let pi = rem.getPuzzleInfo() as ColocationPuzzleInfo;

        let parameters = new Parameters(pi.getRounds(), pi.getStartOffset(), pi.getStartRange());
        let puzzle = new Puzzle(
            pi.getGoal_asU8(),
            new Uint8Array(),
            pi.getStartOffset(),
            parameters
        );

        // TODO: rangeBegin, rangeEnd missing?
        let solution = await puzzle.solve(parameters, singleEncryptedBlocks);

        // Decrypt L2 ticket
        let ticketL2 = await decryptTicketL2(
            solution.secret,
            new Uint8Array(bundle.getEncryptedTicketL2_asU8())
        );

        // Send the L2 ticket to each cache.
        // XXX: This should not be serialized.
        // l2ResultCh := make(chan l2Result)
        let promises = cacheConnections.map(async (cc: CacheConnection) => {
            // for (let i = 0; i < cacheQty; i++) {
            let tl2info = new TicketL2Info();
            tl2info.setEncryptedTicketL2(bundle.getEncryptedTicketL2());
            tl2info.setPuzzleSecret(solution.secret);

            let req = await util.buildClientCacheRequest(bundle, tl2info);
            await this.grpcExchangeTicketL2(cc.getRemote(), req);
        });
        await Promise.all(promises);

        // Decrypt singly-encrypted blocks to produce final plaintext.
        let plaintextBlocks: Uint8Array[] = [];
        let blockIdx: number[] = [];

        for (let i = 0; i < singleEncryptedBlocks.length; i++) {
            let ciphertext = singleEncryptedBlocks[i];

            let plaintext = await util.encryptDataBlock(
                bundle.getTicketRequestList()[i].getBlockIdx(),
                (bundle.getRemainder() as TicketBundleRemainder).getRequestSequenceNo(),
                ticketL2.getInnerSessionKeyList()[i].getKey_asU8(),
                ciphertext
            );

            plaintextBlocks.push(plaintext);
            blockIdx.push(bundle.getTicketRequestList()[i].getBlockIdx());
        }

        console.log('block-group fetch completed without error');
        return new BlockGroup(plaintextBlocks, blockIdx, bundle.getMetadata() as ObjectMetadata);
    }

    // TODO: cc is unused?
    async requestBlock(cc: CacheConnection, b: BlockRequest): Promise<BlockRequest> {
        // Send request ticket to cache; await data.
        let reqData = await util.buildClientCacheRequest(
            b.bundle,
            b.bundle.getTicketRequestList()[b.idx]
        );
        let msgData = await this.grpcGetBlock(cc.getRemote(), reqData);
        console.log('got data response from cache (in bytes)', msgData.getData_asU8().length);

        // Send L1 ticket to cache; await outer decryption key.
        let reqL1 = await util.buildClientCacheRequest(b.bundle, b.bundle.getTicketL1List()[b.idx]);
        let msgL1 = await this.grpcExchangeTicketL1(cc.getRemote(), reqL1);
        console.log('got L1 response from cache');

        // Decrypt data
        let encData = await util.encryptDataBlock(
            b.bundle.getTicketRequestList()[b.idx].getBlockIdx(),
            (b.bundle.getRemainder() as TicketBundleRemainder).getRequestSequenceNo(),
            (msgL1.getOuterKey() as BlockKey).getKey_asU8(),
            msgData.getData_asU8()
        );
        b.encData = encData;

        return b;
    }

    grpcGetContent(remote: string, request: ContentRequest): Promise<ContentResponse> {
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

    grpcGetBlock(remote: string, request: ClientCacheRequest): Promise<ClientCacheResponseData> {
        console.log('Fetching block');
        return new Promise((resolve, reject) => {
            try {
                grpc.invoke(ClientCache.GetBlock, {
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

    grpcExchangeTicketL1(
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

    grpcExchangeTicketL2(
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

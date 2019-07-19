// package: ccmsg
// file: cachecash.proto

import * as jspb from 'google-protobuf';

export class Error extends jspb.Message {
    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Error.AsObject;
    static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Error;
    static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
    export type AsObject = {
        code: number;
        message: string;
    };
}

export class PublicKey extends jspb.Message {
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PublicKey.AsObject;
    static toObject(includeInstance: boolean, msg: PublicKey): PublicKey.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: PublicKey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PublicKey;
    static deserializeBinaryFromReader(message: PublicKey, reader: jspb.BinaryReader): PublicKey;
}

export namespace PublicKey {
    export type AsObject = {
        publicKey: Uint8Array | string;
    };
}

export class EscrowInfo extends jspb.Message {
    hasPublicKey(): boolean;
    clearPublicKey(): void;
    getPublicKey(): PublicKey | undefined;
    setPublicKey(value?: PublicKey): void;

    hasPublisherPublicKey(): boolean;
    clearPublisherPublicKey(): void;
    getPublisherPublicKey(): PublicKey | undefined;
    setPublisherPublicKey(value?: PublicKey): void;

    getDrawDelay(): number;
    setDrawDelay(value: number): void;

    getExpirationDelay(): number;
    setExpirationDelay(value: number): void;

    getStartBlock(): number;
    setStartBlock(value: number): void;

    clearTicketsPerBlockList(): void;
    getTicketsPerBlockList(): Array<Segment>;
    setTicketsPerBlockList(value: Array<Segment>): void;
    addTicketsPerBlock(value?: Segment, index?: number): Segment;

    getId(): Uint8Array | string;
    getId_asU8(): Uint8Array;
    getId_asB64(): string;
    setId(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EscrowInfo.AsObject;
    static toObject(includeInstance: boolean, msg: EscrowInfo): EscrowInfo.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: EscrowInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EscrowInfo;
    static deserializeBinaryFromReader(message: EscrowInfo, reader: jspb.BinaryReader): EscrowInfo;
}

export namespace EscrowInfo {
    export type AsObject = {
        publicKey?: PublicKey.AsObject;
        publisherPublicKey?: PublicKey.AsObject;
        drawDelay: number;
        expirationDelay: number;
        startBlock: number;
        ticketsPerBlockList: Array<Segment.AsObject>;
        id: Uint8Array | string;
    };
}

export class Segment extends jspb.Message {
    getLength(): number;
    setLength(value: number): void;

    getValue(): number;
    setValue(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Segment.AsObject;
    static toObject(includeInstance: boolean, msg: Segment): Segment.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: Segment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Segment;
    static deserializeBinaryFromReader(message: Segment, reader: jspb.BinaryReader): Segment;
}

export namespace Segment {
    export type AsObject = {
        length: number;
        value: number;
    };
}

export class TicketBundle extends jspb.Message {
    hasRemainder(): boolean;
    clearRemainder(): void;
    getRemainder(): TicketBundleRemainder | undefined;
    setRemainder(value?: TicketBundleRemainder): void;

    clearTicketRequestList(): void;
    getTicketRequestList(): Array<TicketRequest>;
    setTicketRequestList(value: Array<TicketRequest>): void;
    addTicketRequest(value?: TicketRequest, index?: number): TicketRequest;

    clearTicketL1List(): void;
    getTicketL1List(): Array<TicketL1>;
    setTicketL1List(value: Array<TicketL1>): void;
    addTicketL1(value?: TicketL1, index?: number): TicketL1;

    getEncryptedTicketL2(): Uint8Array | string;
    getEncryptedTicketL2_asU8(): Uint8Array;
    getEncryptedTicketL2_asB64(): string;
    setEncryptedTicketL2(value: Uint8Array | string): void;

    hasBatchSig(): boolean;
    clearBatchSig(): void;
    getBatchSig(): BatchSignature | undefined;
    setBatchSig(value?: BatchSignature): void;

    hasBundleSignerCert(): boolean;
    clearBundleSignerCert(): void;
    getBundleSignerCert(): Certificate | undefined;
    setBundleSignerCert(value?: Certificate): void;

    clearCacheInfoList(): void;
    getCacheInfoList(): Array<CacheInfo>;
    setCacheInfoList(value: Array<CacheInfo>): void;
    addCacheInfo(value?: CacheInfo, index?: number): CacheInfo;

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): ObjectMetadata | undefined;
    setMetadata(value?: ObjectMetadata): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketBundle.AsObject;
    static toObject(includeInstance: boolean, msg: TicketBundle): TicketBundle.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: TicketBundle, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketBundle;
    static deserializeBinaryFromReader(
        message: TicketBundle,
        reader: jspb.BinaryReader
    ): TicketBundle;
}

export namespace TicketBundle {
    export type AsObject = {
        remainder?: TicketBundleRemainder.AsObject;
        ticketRequestList: Array<TicketRequest.AsObject>;
        ticketL1List: Array<TicketL1.AsObject>;
        encryptedTicketL2: Uint8Array | string;
        batchSig?: BatchSignature.AsObject;
        bundleSignerCert?: Certificate.AsObject;
        cacheInfoList: Array<CacheInfo.AsObject>;
        metadata?: ObjectMetadata.AsObject;
    };
}

export class TicketBundleRemainder extends jspb.Message {
    getRequestSequenceNo(): number;
    setRequestSequenceNo(value: number): void;

    getEscrowId(): Uint8Array | string;
    getEscrowId_asU8(): Uint8Array;
    getEscrowId_asB64(): string;
    setEscrowId(value: Uint8Array | string): void;

    getObjectId(): Uint8Array | string;
    getObjectId_asU8(): Uint8Array;
    getObjectId_asB64(): string;
    setObjectId(value: Uint8Array | string): void;

    hasPuzzleInfo(): boolean;
    clearPuzzleInfo(): void;
    getPuzzleInfo(): ColocationPuzzleInfo | undefined;
    setPuzzleInfo(value?: ColocationPuzzleInfo): void;

    hasClientPublicKey(): boolean;
    clearClientPublicKey(): void;
    getClientPublicKey(): PublicKey | undefined;
    setClientPublicKey(value?: PublicKey): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketBundleRemainder.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: TicketBundleRemainder
    ): TicketBundleRemainder.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: TicketBundleRemainder, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketBundleRemainder;
    static deserializeBinaryFromReader(
        message: TicketBundleRemainder,
        reader: jspb.BinaryReader
    ): TicketBundleRemainder;
}

export namespace TicketBundleRemainder {
    export type AsObject = {
        requestSequenceNo: number;
        escrowId: Uint8Array | string;
        objectId: Uint8Array | string;
        puzzleInfo?: ColocationPuzzleInfo.AsObject;
        clientPublicKey?: PublicKey.AsObject;
    };
}

export class CacheInfo extends jspb.Message {
    hasAddr(): boolean;
    clearAddr(): void;
    getAddr(): NetworkAddress | undefined;
    setAddr(value?: NetworkAddress): void;

    hasPubkey(): boolean;
    clearPubkey(): void;
    getPubkey(): PublicKey | undefined;
    setPubkey(value?: PublicKey): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheInfo.AsObject;
    static toObject(includeInstance: boolean, msg: CacheInfo): CacheInfo.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheInfo;
    static deserializeBinaryFromReader(message: CacheInfo, reader: jspb.BinaryReader): CacheInfo;
}

export namespace CacheInfo {
    export type AsObject = {
        addr?: NetworkAddress.AsObject;
        pubkey?: PublicKey.AsObject;
    };
}

export class NetworkAddress extends jspb.Message {
    getInetaddr(): Uint8Array | string;
    getInetaddr_asU8(): Uint8Array;
    getInetaddr_asB64(): string;
    setInetaddr(value: Uint8Array | string): void;

    getInet6addr(): Uint8Array | string;
    getInet6addr_asU8(): Uint8Array;
    getInet6addr_asB64(): string;
    setInet6addr(value: Uint8Array | string): void;

    getPort(): number;
    setPort(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NetworkAddress.AsObject;
    static toObject(includeInstance: boolean, msg: NetworkAddress): NetworkAddress.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: NetworkAddress, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NetworkAddress;
    static deserializeBinaryFromReader(
        message: NetworkAddress,
        reader: jspb.BinaryReader
    ): NetworkAddress;
}

export namespace NetworkAddress {
    export type AsObject = {
        inetaddr: Uint8Array | string;
        inet6addr: Uint8Array | string;
        port: number;
    };
}

export class ColocationPuzzleInfo extends jspb.Message {
    getGoal(): Uint8Array | string;
    getGoal_asU8(): Uint8Array;
    getGoal_asB64(): string;
    setGoal(value: Uint8Array | string): void;

    getRounds(): number;
    setRounds(value: number): void;

    getStartOffset(): number;
    setStartOffset(value: number): void;

    getStartRange(): number;
    setStartRange(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ColocationPuzzleInfo.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: ColocationPuzzleInfo
    ): ColocationPuzzleInfo.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ColocationPuzzleInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ColocationPuzzleInfo;
    static deserializeBinaryFromReader(
        message: ColocationPuzzleInfo,
        reader: jspb.BinaryReader
    ): ColocationPuzzleInfo;
}

export namespace ColocationPuzzleInfo {
    export type AsObject = {
        goal: Uint8Array | string;
        rounds: number;
        startOffset: number;
        startRange: number;
    };
}

export class BatchSignature extends jspb.Message {
    clearPathDirectionList(): void;
    getPathDirectionList(): Array<boolean>;
    setPathDirectionList(value: Array<boolean>): void;
    addPathDirection(value: boolean, index?: number): boolean;

    clearPathDigestList(): void;
    getPathDigestList(): Array<Uint8Array | string>;
    getPathDigestList_asU8(): Array<Uint8Array>;
    getPathDigestList_asB64(): Array<string>;
    setPathDigestList(value: Array<Uint8Array | string>): void;
    addPathDigest(value: Uint8Array | string, index?: number): Uint8Array | string;

    getRootSignature(): Uint8Array | string;
    getRootSignature_asU8(): Uint8Array;
    getRootSignature_asB64(): string;
    setRootSignature(value: Uint8Array | string): void;

    hasSigningKey(): boolean;
    clearSigningKey(): void;
    getSigningKey(): PublicKey | undefined;
    setSigningKey(value?: PublicKey): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BatchSignature.AsObject;
    static toObject(includeInstance: boolean, msg: BatchSignature): BatchSignature.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: BatchSignature, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BatchSignature;
    static deserializeBinaryFromReader(
        message: BatchSignature,
        reader: jspb.BinaryReader
    ): BatchSignature;
}

export namespace BatchSignature {
    export type AsObject = {
        pathDirectionList: Array<boolean>;
        pathDigestList: Array<Uint8Array | string>;
        rootSignature: Uint8Array | string;
        signingKey?: PublicKey.AsObject;
    };
}

export class BlockKey extends jspb.Message {
    getKey(): Uint8Array | string;
    getKey_asU8(): Uint8Array;
    getKey_asB64(): string;
    setKey(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockKey.AsObject;
    static toObject(includeInstance: boolean, msg: BlockKey): BlockKey.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: BlockKey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockKey;
    static deserializeBinaryFromReader(message: BlockKey, reader: jspb.BinaryReader): BlockKey;
}

export namespace BlockKey {
    export type AsObject = {
        key: Uint8Array | string;
    };
}

export class TicketRequest extends jspb.Message {
    getChunkIdx(): number;
    setChunkIdx(value: number): void;

    hasInnerKey(): boolean;
    clearInnerKey(): void;
    getInnerKey(): BlockKey | undefined;
    setInnerKey(value?: BlockKey): void;

    getChunkId(): Uint8Array | string;
    getChunkId_asU8(): Uint8Array;
    getChunkId_asB64(): string;
    setChunkId(value: Uint8Array | string): void;

    hasCachePublicKey(): boolean;
    clearCachePublicKey(): void;
    getCachePublicKey(): PublicKey | undefined;
    setCachePublicKey(value?: PublicKey): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TicketRequest): TicketRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: TicketRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketRequest;
    static deserializeBinaryFromReader(
        message: TicketRequest,
        reader: jspb.BinaryReader
    ): TicketRequest;
}

export namespace TicketRequest {
    export type AsObject = {
        chunkIdx: number;
        innerKey?: BlockKey.AsObject;
        chunkId: Uint8Array | string;
        cachePublicKey?: PublicKey.AsObject;
    };
}

export class TicketL1 extends jspb.Message {
    getTicketNo(): number;
    setTicketNo(value: number): void;

    hasCachePublicKey(): boolean;
    clearCachePublicKey(): void;
    getCachePublicKey(): PublicKey | undefined;
    setCachePublicKey(value?: PublicKey): void;

    getChunkIdx(): number;
    setChunkIdx(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketL1.AsObject;
    static toObject(includeInstance: boolean, msg: TicketL1): TicketL1.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: TicketL1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketL1;
    static deserializeBinaryFromReader(message: TicketL1, reader: jspb.BinaryReader): TicketL1;
}

export namespace TicketL1 {
    export type AsObject = {
        ticketNo: number;
        cachePublicKey?: PublicKey.AsObject;
        chunkIdx: number;
    };
}

export class TicketL2 extends jspb.Message {
    getNonce(): Uint8Array | string;
    getNonce_asU8(): Uint8Array;
    getNonce_asB64(): string;
    setNonce(value: Uint8Array | string): void;

    clearInnerSessionKeyList(): void;
    getInnerSessionKeyList(): Array<BlockKey>;
    setInnerSessionKeyList(value: Array<BlockKey>): void;
    addInnerSessionKey(value?: BlockKey, index?: number): BlockKey;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketL2.AsObject;
    static toObject(includeInstance: boolean, msg: TicketL2): TicketL2.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: TicketL2, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketL2;
    static deserializeBinaryFromReader(message: TicketL2, reader: jspb.BinaryReader): TicketL2;
}

export namespace TicketL2 {
    export type AsObject = {
        nonce: Uint8Array | string;
        innerSessionKeyList: Array<BlockKey.AsObject>;
    };
}

export class TicketL2Info extends jspb.Message {
    getEncryptedTicketL2(): Uint8Array | string;
    getEncryptedTicketL2_asU8(): Uint8Array;
    getEncryptedTicketL2_asB64(): string;
    setEncryptedTicketL2(value: Uint8Array | string): void;

    getPuzzleSecret(): Uint8Array | string;
    getPuzzleSecret_asU8(): Uint8Array;
    getPuzzleSecret_asB64(): string;
    setPuzzleSecret(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketL2Info.AsObject;
    static toObject(includeInstance: boolean, msg: TicketL2Info): TicketL2Info.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: TicketL2Info, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketL2Info;
    static deserializeBinaryFromReader(
        message: TicketL2Info,
        reader: jspb.BinaryReader
    ): TicketL2Info;
}

export namespace TicketL2Info {
    export type AsObject = {
        encryptedTicketL2: Uint8Array | string;
        puzzleSecret: Uint8Array | string;
    };
}

export class Certificate extends jspb.Message {
    hasSubjectPublicKey(): boolean;
    clearSubjectPublicKey(): void;
    getSubjectPublicKey(): PublicKey | undefined;
    setSubjectPublicKey(value?: PublicKey): void;

    getEscrowId(): Uint8Array | string;
    getEscrowId_asU8(): Uint8Array;
    getEscrowId_asB64(): string;
    setEscrowId(value: Uint8Array | string): void;

    getUsage(): string;
    setUsage(value: string): void;

    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Certificate.AsObject;
    static toObject(includeInstance: boolean, msg: Certificate): Certificate.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: Certificate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Certificate;
    static deserializeBinaryFromReader(
        message: Certificate,
        reader: jspb.BinaryReader
    ): Certificate;
}

export namespace Certificate {
    export type AsObject = {
        subjectPublicKey?: PublicKey.AsObject;
        escrowId: Uint8Array | string;
        usage: string;
        signature: Uint8Array | string;
    };
}

export class TicketBundleSubdigests extends jspb.Message {
    clearTicketRequestDigestList(): void;
    getTicketRequestDigestList(): Array<Uint8Array | string>;
    getTicketRequestDigestList_asU8(): Array<Uint8Array>;
    getTicketRequestDigestList_asB64(): Array<string>;
    setTicketRequestDigestList(value: Array<Uint8Array | string>): void;
    addTicketRequestDigest(value: Uint8Array | string, index?: number): Uint8Array | string;

    clearTicketL1DigestList(): void;
    getTicketL1DigestList(): Array<Uint8Array | string>;
    getTicketL1DigestList_asU8(): Array<Uint8Array>;
    getTicketL1DigestList_asB64(): Array<string>;
    setTicketL1DigestList(value: Array<Uint8Array | string>): void;
    addTicketL1Digest(value: Uint8Array | string, index?: number): Uint8Array | string;

    getEncryptedTicketL2Digest(): Uint8Array | string;
    getEncryptedTicketL2Digest_asU8(): Uint8Array;
    getEncryptedTicketL2Digest_asB64(): string;
    setEncryptedTicketL2Digest(value: Uint8Array | string): void;

    getRemainderDigest(): Uint8Array | string;
    getRemainderDigest_asU8(): Uint8Array;
    getRemainderDigest_asB64(): string;
    setRemainderDigest(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketBundleSubdigests.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: TicketBundleSubdigests
    ): TicketBundleSubdigests.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(
        message: TicketBundleSubdigests,
        writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): TicketBundleSubdigests;
    static deserializeBinaryFromReader(
        message: TicketBundleSubdigests,
        reader: jspb.BinaryReader
    ): TicketBundleSubdigests;
}

export namespace TicketBundleSubdigests {
    export type AsObject = {
        ticketRequestDigestList: Array<Uint8Array | string>;
        ticketL1DigestList: Array<Uint8Array | string>;
        encryptedTicketL2Digest: Uint8Array | string;
        remainderDigest: Uint8Array | string;
    };
}

export class ContentRequest extends jspb.Message {
    hasClientPublicKey(): boolean;
    clearClientPublicKey(): void;
    getClientPublicKey(): PublicKey | undefined;
    setClientPublicKey(value?: PublicKey): void;

    getPath(): string;
    setPath(value: string): void;

    getRangeBegin(): number;
    setRangeBegin(value: number): void;

    getRangeEnd(): number;
    setRangeEnd(value: number): void;

    getSequenceNo(): number;
    setSequenceNo(value: number): void;

    getCacheStatusMap(): jspb.Map<string, ContentRequest.ClientCacheStatus>;
    clearCacheStatusMap(): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ContentRequest): ContentRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ContentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContentRequest;
    static deserializeBinaryFromReader(
        message: ContentRequest,
        reader: jspb.BinaryReader
    ): ContentRequest;
}

export namespace ContentRequest {
    export type AsObject = {
        clientPublicKey?: PublicKey.AsObject;
        path: string;
        rangeBegin: number;
        rangeEnd: number;
        sequenceNo: number;
        cacheStatusMap: Array<[string, ContentRequest.ClientCacheStatus.AsObject]>;
    };

    export class ClientCacheStatus extends jspb.Message {
        getBacklogDepth(): number;
        setBacklogDepth(value: number): void;

        getStatus(): ContentRequest.ClientCacheStatus.Status;
        setStatus(value: ContentRequest.ClientCacheStatus.Status): void;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ClientCacheStatus.AsObject;
        static toObject(
            includeInstance: boolean,
            msg: ClientCacheStatus
        ): ClientCacheStatus.AsObject;
        static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
        static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
        static serializeBinaryToWriter(message: ClientCacheStatus, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ClientCacheStatus;
        static deserializeBinaryFromReader(
            message: ClientCacheStatus,
            reader: jspb.BinaryReader
        ): ClientCacheStatus;
    }

    export namespace ClientCacheStatus {
        export type AsObject = {
            backlogDepth: number;
            status: ContentRequest.ClientCacheStatus.Status;
        };

        export enum Status {
            DEFAULT = 0,
            UNUSABLE = 1
        }
    }
}

export class ContentResponse extends jspb.Message {
    getRequestSequenceNo(): number;
    setRequestSequenceNo(value: number): void;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): void;

    clearBundlesList(): void;
    getBundlesList(): Array<TicketBundle>;
    setBundlesList(value: Array<TicketBundle>): void;
    addBundles(value?: TicketBundle, index?: number): TicketBundle;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ContentResponse): ContentResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ContentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContentResponse;
    static deserializeBinaryFromReader(
        message: ContentResponse,
        reader: jspb.BinaryReader
    ): ContentResponse;
}

export namespace ContentResponse {
    export type AsObject = {
        requestSequenceNo: number;
        error?: Error.AsObject;
        bundlesList: Array<TicketBundle.AsObject>;
    };
}

export class ClientCacheRequest extends jspb.Message {
    getSequenceNo(): number;
    setSequenceNo(value: number): void;

    hasBundleRemainder(): boolean;
    clearBundleRemainder(): void;
    getBundleRemainder(): TicketBundleRemainder | undefined;
    setBundleRemainder(value?: TicketBundleRemainder): void;

    hasTicketRequest(): boolean;
    clearTicketRequest(): void;
    getTicketRequest(): TicketRequest | undefined;
    setTicketRequest(value?: TicketRequest): void;

    hasTicketL1(): boolean;
    clearTicketL1(): void;
    getTicketL1(): TicketL1 | undefined;
    setTicketL1(value?: TicketL1): void;

    hasTicketL2(): boolean;
    clearTicketL2(): void;
    getTicketL2(): TicketL2Info | undefined;
    setTicketL2(value?: TicketL2Info): void;

    hasTicketBundleSubdigests(): boolean;
    clearTicketBundleSubdigests(): void;
    getTicketBundleSubdigests(): TicketBundleSubdigests | undefined;
    setTicketBundleSubdigests(value?: TicketBundleSubdigests): void;

    hasBundleSig(): boolean;
    clearBundleSig(): void;
    getBundleSig(): BatchSignature | undefined;
    setBundleSig(value?: BatchSignature): void;

    hasBundleSignerCert(): boolean;
    clearBundleSignerCert(): void;
    getBundleSignerCert(): Certificate | undefined;
    setBundleSignerCert(value?: Certificate): void;

    getTicketCase(): ClientCacheRequest.TicketCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientCacheRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ClientCacheRequest): ClientCacheRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ClientCacheRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientCacheRequest;
    static deserializeBinaryFromReader(
        message: ClientCacheRequest,
        reader: jspb.BinaryReader
    ): ClientCacheRequest;
}

export namespace ClientCacheRequest {
    export type AsObject = {
        sequenceNo: number;
        bundleRemainder?: TicketBundleRemainder.AsObject;
        ticketRequest?: TicketRequest.AsObject;
        ticketL1?: TicketL1.AsObject;
        ticketL2?: TicketL2Info.AsObject;
        ticketBundleSubdigests?: TicketBundleSubdigests.AsObject;
        bundleSig?: BatchSignature.AsObject;
        bundleSignerCert?: Certificate.AsObject;
    };

    export enum TicketCase {
        TICKET_NOT_SET = 0,
        TICKET_REQUEST = 5,
        TICKET_L1 = 6,
        TICKET_L2 = 7
    }
}

export class ClientCacheResponse extends jspb.Message {
    getRequestSequenceNo(): number;
    setRequestSequenceNo(value: number): void;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): void;

    hasDataResponse(): boolean;
    clearDataResponse(): void;
    getDataResponse(): ClientCacheResponseData | undefined;
    setDataResponse(value?: ClientCacheResponseData): void;

    hasL1Response(): boolean;
    clearL1Response(): void;
    getL1Response(): ClientCacheResponseL1 | undefined;
    setL1Response(value?: ClientCacheResponseL1): void;

    hasL2Response(): boolean;
    clearL2Response(): void;
    getL2Response(): ClientCacheResponseL2 | undefined;
    setL2Response(value?: ClientCacheResponseL2): void;

    getMsgCase(): ClientCacheResponse.MsgCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientCacheResponse.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: ClientCacheResponse
    ): ClientCacheResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ClientCacheResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientCacheResponse;
    static deserializeBinaryFromReader(
        message: ClientCacheResponse,
        reader: jspb.BinaryReader
    ): ClientCacheResponse;
}

export namespace ClientCacheResponse {
    export type AsObject = {
        requestSequenceNo: number;
        error?: Error.AsObject;
        dataResponse?: ClientCacheResponseData.AsObject;
        l1Response?: ClientCacheResponseL1.AsObject;
        l2Response?: ClientCacheResponseL2.AsObject;
    };

    export enum MsgCase {
        MSG_NOT_SET = 0,
        ERROR = 2,
        DATA_RESPONSE = 3,
        L1_RESPONSE = 4,
        L2_RESPONSE = 5
    }
}

export class ClientCacheResponseData extends jspb.Message {
    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientCacheResponseData.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: ClientCacheResponseData
    ): ClientCacheResponseData.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(
        message: ClientCacheResponseData,
        writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): ClientCacheResponseData;
    static deserializeBinaryFromReader(
        message: ClientCacheResponseData,
        reader: jspb.BinaryReader
    ): ClientCacheResponseData;
}

export namespace ClientCacheResponseData {
    export type AsObject = {
        data: Uint8Array | string;
    };
}

export class ClientCacheResponseL1 extends jspb.Message {
    hasOuterKey(): boolean;
    clearOuterKey(): void;
    getOuterKey(): BlockKey | undefined;
    setOuterKey(value?: BlockKey): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientCacheResponseL1.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: ClientCacheResponseL1
    ): ClientCacheResponseL1.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ClientCacheResponseL1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientCacheResponseL1;
    static deserializeBinaryFromReader(
        message: ClientCacheResponseL1,
        reader: jspb.BinaryReader
    ): ClientCacheResponseL1;
}

export namespace ClientCacheResponseL1 {
    export type AsObject = {
        outerKey?: BlockKey.AsObject;
    };
}

export class ClientCacheResponseL2 extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientCacheResponseL2.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: ClientCacheResponseL2
    ): ClientCacheResponseL2.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ClientCacheResponseL2, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientCacheResponseL2;
    static deserializeBinaryFromReader(
        message: ClientCacheResponseL2,
        reader: jspb.BinaryReader
    ): ClientCacheResponseL2;
}

export namespace ClientCacheResponseL2 {
    export type AsObject = {};
}

export class CacheMissRequest extends jspb.Message {
    getRangeBegin(): number;
    setRangeBegin(value: number): void;

    getRangeEnd(): number;
    setRangeEnd(value: number): void;

    getObjectId(): Uint8Array | string;
    getObjectId_asU8(): Uint8Array;
    getObjectId_asB64(): string;
    setObjectId(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheMissRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CacheMissRequest): CacheMissRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheMissRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheMissRequest;
    static deserializeBinaryFromReader(
        message: CacheMissRequest,
        reader: jspb.BinaryReader
    ): CacheMissRequest;
}

export namespace CacheMissRequest {
    export type AsObject = {
        rangeBegin: number;
        rangeEnd: number;
        objectId: Uint8Array | string;
    };
}

export class CacheMissResponse extends jspb.Message {
    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): ObjectMetadata | undefined;
    setMetadata(value?: ObjectMetadata): void;

    clearChunksList(): void;
    getChunksList(): Array<Chunk>;
    setChunksList(value: Array<Chunk>): void;
    addChunks(value?: Chunk, index?: number): Chunk;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheMissResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CacheMissResponse): CacheMissResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheMissResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheMissResponse;
    static deserializeBinaryFromReader(
        message: CacheMissResponse,
        reader: jspb.BinaryReader
    ): CacheMissResponse;
}

export namespace CacheMissResponse {
    export type AsObject = {
        metadata?: ObjectMetadata.AsObject;
        chunksList: Array<Chunk.AsObject>;
    };
}

export class Chunk extends jspb.Message {
    getSlotIdx(): number;
    setSlotIdx(value: number): void;

    hasHttp(): boolean;
    clearHttp(): void;
    getHttp(): ChunkSourceHTTP | undefined;
    setHttp(value?: ChunkSourceHTTP): void;

    hasInline(): boolean;
    clearInline(): void;
    getInline(): ChunkSourceInline | undefined;
    setInline(value?: ChunkSourceInline): void;

    getSourceCase(): Chunk.SourceCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Chunk.AsObject;
    static toObject(includeInstance: boolean, msg: Chunk): Chunk.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: Chunk, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Chunk;
    static deserializeBinaryFromReader(message: Chunk, reader: jspb.BinaryReader): Chunk;
}

export namespace Chunk {
    export type AsObject = {
        slotIdx: number;
        http?: ChunkSourceHTTP.AsObject;
        inline?: ChunkSourceInline.AsObject;
    };

    export enum SourceCase {
        SOURCE_NOT_SET = 0,
        HTTP = 10,
        INLINE = 20
    }
}

export class ChunkSourceHTTP extends jspb.Message {
    getUrl(): string;
    setUrl(value: string): void;

    getRangeBegin(): number;
    setRangeBegin(value: number): void;

    getRangeEnd(): number;
    setRangeEnd(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChunkSourceHTTP.AsObject;
    static toObject(includeInstance: boolean, msg: ChunkSourceHTTP): ChunkSourceHTTP.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ChunkSourceHTTP, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChunkSourceHTTP;
    static deserializeBinaryFromReader(
        message: ChunkSourceHTTP,
        reader: jspb.BinaryReader
    ): ChunkSourceHTTP;
}

export namespace ChunkSourceHTTP {
    export type AsObject = {
        url: string;
        rangeBegin: number;
        rangeEnd: number;
    };
}

export class ChunkSourceInline extends jspb.Message {
    clearChunkList(): void;
    getChunkList(): Array<Uint8Array | string>;
    getChunkList_asU8(): Array<Uint8Array>;
    getChunkList_asB64(): Array<string>;
    setChunkList(value: Array<Uint8Array | string>): void;
    addChunk(value: Uint8Array | string, index?: number): Uint8Array | string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChunkSourceInline.AsObject;
    static toObject(includeInstance: boolean, msg: ChunkSourceInline): ChunkSourceInline.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ChunkSourceInline, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChunkSourceInline;
    static deserializeBinaryFromReader(
        message: ChunkSourceInline,
        reader: jspb.BinaryReader
    ): ChunkSourceInline;
}

export namespace ChunkSourceInline {
    export type AsObject = {
        chunkList: Array<Uint8Array | string>;
    };
}

export class ObjectMetadata extends jspb.Message {
    getObjectSize(): number;
    setObjectSize(value: number): void;

    getChunkSize(): number;
    setChunkSize(value: number): void;

    getEtag(): Uint8Array | string;
    getEtag_asU8(): Uint8Array;
    getEtag_asB64(): string;
    setEtag(value: Uint8Array | string): void;

    getLastModified(): string;
    setLastModified(value: string): void;

    getCacheExpiration(): string;
    setCacheExpiration(value: string): void;

    getMinimumBacklogDepth(): number;
    setMinimumBacklogDepth(value: number): void;

    getBundleRequestInterval(): number;
    setBundleRequestInterval(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ObjectMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: ObjectMetadata): ObjectMetadata.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: ObjectMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ObjectMetadata;
    static deserializeBinaryFromReader(
        message: ObjectMetadata,
        reader: jspb.BinaryReader
    ): ObjectMetadata;
}

export namespace ObjectMetadata {
    export type AsObject = {
        objectSize: number;
        chunkSize: number;
        etag: Uint8Array | string;
        lastModified: string;
        cacheExpiration: string;
        minimumBacklogDepth: number;
        bundleRequestInterval: number;
    };
}

export class CacheAnnounceRequest extends jspb.Message {
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): void;

    getVersion(): string;
    setVersion(value: string): void;

    getFreeMemory(): number;
    setFreeMemory(value: number): void;

    getTotalMemory(): number;
    setTotalMemory(value: number): void;

    getFreeDisk(): number;
    setFreeDisk(value: number): void;

    getTotalDisk(): number;
    setTotalDisk(value: number): void;

    getStartupTime(): number;
    setStartupTime(value: number): void;

    getContactUrl(): string;
    setContactUrl(value: string): void;

    getPort(): number;
    setPort(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheAnnounceRequest.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: CacheAnnounceRequest
    ): CacheAnnounceRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheAnnounceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheAnnounceRequest;
    static deserializeBinaryFromReader(
        message: CacheAnnounceRequest,
        reader: jspb.BinaryReader
    ): CacheAnnounceRequest;
}

export namespace CacheAnnounceRequest {
    export type AsObject = {
        publicKey: Uint8Array | string;
        version: string;
        freeMemory: number;
        totalMemory: number;
        freeDisk: number;
        totalDisk: number;
        startupTime: number;
        contactUrl: string;
        port: number;
    };
}

export class CacheAnnounceResponse extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheAnnounceResponse.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: CacheAnnounceResponse
    ): CacheAnnounceResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheAnnounceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheAnnounceResponse;
    static deserializeBinaryFromReader(
        message: CacheAnnounceResponse,
        reader: jspb.BinaryReader
    ): CacheAnnounceResponse;
}

export namespace CacheAnnounceResponse {
    export type AsObject = {};
}

export class CacheFetchRequest extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheFetchRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CacheFetchRequest): CacheFetchRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheFetchRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheFetchRequest;
    static deserializeBinaryFromReader(
        message: CacheFetchRequest,
        reader: jspb.BinaryReader
    ): CacheFetchRequest;
}

export namespace CacheFetchRequest {
    export type AsObject = {};
}

export class CacheDescription extends jspb.Message {
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): void;

    getVersion(): string;
    setVersion(value: string): void;

    getFreeMemory(): number;
    setFreeMemory(value: number): void;

    getTotalMemory(): number;
    setTotalMemory(value: number): void;

    getFreeDisk(): number;
    setFreeDisk(value: number): void;

    getTotalDisk(): number;
    setTotalDisk(value: number): void;

    getStartupTime(): number;
    setStartupTime(value: number): void;

    getContactUrl(): string;
    setContactUrl(value: string): void;

    getExternalIp(): string;
    setExternalIp(value: string): void;

    getPort(): number;
    setPort(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheDescription.AsObject;
    static toObject(includeInstance: boolean, msg: CacheDescription): CacheDescription.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheDescription, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheDescription;
    static deserializeBinaryFromReader(
        message: CacheDescription,
        reader: jspb.BinaryReader
    ): CacheDescription;
}

export namespace CacheDescription {
    export type AsObject = {
        publicKey: Uint8Array | string;
        version: string;
        freeMemory: number;
        totalMemory: number;
        freeDisk: number;
        totalDisk: number;
        startupTime: number;
        contactUrl: string;
        externalIp: string;
        port: number;
    };
}

export class CacheFetchResponse extends jspb.Message {
    clearCachesList(): void;
    getCachesList(): Array<CacheDescription>;
    setCachesList(value: Array<CacheDescription>): void;
    addCaches(value?: CacheDescription, index?: number): CacheDescription;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CacheFetchResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CacheFetchResponse): CacheFetchResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: CacheFetchResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CacheFetchResponse;
    static deserializeBinaryFromReader(
        message: CacheFetchResponse,
        reader: jspb.BinaryReader
    ): CacheFetchResponse;
}

export namespace CacheFetchResponse {
    export type AsObject = {
        cachesList: Array<CacheDescription.AsObject>;
    };
}

export class EscrowOfferRequest extends jspb.Message {
    getEscrowId(): Uint8Array | string;
    getEscrowId_asU8(): Uint8Array;
    getEscrowId_asB64(): string;
    setEscrowId(value: Uint8Array | string): void;

    getInnerMasterKey(): Uint8Array | string;
    getInnerMasterKey_asU8(): Uint8Array;
    getInnerMasterKey_asB64(): string;
    setInnerMasterKey(value: Uint8Array | string): void;

    getOuterMasterKey(): Uint8Array | string;
    getOuterMasterKey_asU8(): Uint8Array;
    getOuterMasterKey_asB64(): string;
    setOuterMasterKey(value: Uint8Array | string): void;

    getSlots(): number;
    setSlots(value: number): void;

    getPublisherAddr(): string;
    setPublisherAddr(value: string): void;

    getStartBlock(): number;
    setStartBlock(value: number): void;

    getEndBlock(): number;
    setEndBlock(value: number): void;

    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): void;

    getPrivateKey(): Uint8Array | string;
    getPrivateKey_asU8(): Uint8Array;
    getPrivateKey_asB64(): string;
    setPrivateKey(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EscrowOfferRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EscrowOfferRequest): EscrowOfferRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: EscrowOfferRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EscrowOfferRequest;
    static deserializeBinaryFromReader(
        message: EscrowOfferRequest,
        reader: jspb.BinaryReader
    ): EscrowOfferRequest;
}

export namespace EscrowOfferRequest {
    export type AsObject = {
        escrowId: Uint8Array | string;
        innerMasterKey: Uint8Array | string;
        outerMasterKey: Uint8Array | string;
        slots: number;
        publisherAddr: string;
        startBlock: number;
        endBlock: number;
        publicKey: Uint8Array | string;
        privateKey: Uint8Array | string;
    };
}

export class EscrowOfferResponse extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EscrowOfferResponse.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: EscrowOfferResponse
    ): EscrowOfferResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: EscrowOfferResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EscrowOfferResponse;
    static deserializeBinaryFromReader(
        message: EscrowOfferResponse,
        reader: jspb.BinaryReader
    ): EscrowOfferResponse;
}

export namespace EscrowOfferResponse {
    export type AsObject = {};
}

export class PingCacheRequest extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingCacheRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PingCacheRequest): PingCacheRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: PingCacheRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingCacheRequest;
    static deserializeBinaryFromReader(
        message: PingCacheRequest,
        reader: jspb.BinaryReader
    ): PingCacheRequest;
}

export namespace PingCacheRequest {
    export type AsObject = {};
}

export class PingCacheResponse extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingCacheResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PingCacheResponse): PingCacheResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: PingCacheResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingCacheResponse;
    static deserializeBinaryFromReader(
        message: PingCacheResponse,
        reader: jspb.BinaryReader
    ): PingCacheResponse;
}

export namespace PingCacheResponse {
    export type AsObject = {};
}

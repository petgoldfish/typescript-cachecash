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
    getBlockIdx(): number;
    setBlockIdx(value: number): void;

    hasInnerKey(): boolean;
    clearInnerKey(): void;
    getInnerKey(): BlockKey | undefined;
    setInnerKey(value?: BlockKey): void;

    getBlockId(): Uint8Array | string;
    getBlockId_asU8(): Uint8Array;
    getBlockId_asB64(): string;
    setBlockId(value: Uint8Array | string): void;

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
        blockIdx: number;
        innerKey?: BlockKey.AsObject;
        blockId: Uint8Array | string;
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

    getBlockIdx(): number;
    setBlockIdx(value: number): void;

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
        blockIdx: number;
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
    };
}

export class ContentResponse extends jspb.Message {
    getRequestSequenceNo(): number;
    setRequestSequenceNo(value: number): void;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): void;

    hasBundle(): boolean;
    clearBundle(): void;
    getBundle(): TicketBundle | undefined;
    setBundle(value?: TicketBundle): void;

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
        bundle?: TicketBundle.AsObject;
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
    getHttp(): BlockSourceHTTP | undefined;
    setHttp(value?: BlockSourceHTTP): void;

    hasInline(): boolean;
    clearInline(): void;
    getInline(): BlockSourceInline | undefined;
    setInline(value?: BlockSourceInline): void;

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
        http?: BlockSourceHTTP.AsObject;
        inline?: BlockSourceInline.AsObject;
    };

    export enum SourceCase {
        SOURCE_NOT_SET = 0,
        HTTP = 10,
        INLINE = 20
    }
}

export class BlockSourceHTTP extends jspb.Message {
    getUrl(): string;
    setUrl(value: string): void;

    getRangeBegin(): number;
    setRangeBegin(value: number): void;

    getRangeEnd(): number;
    setRangeEnd(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockSourceHTTP.AsObject;
    static toObject(includeInstance: boolean, msg: BlockSourceHTTP): BlockSourceHTTP.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: BlockSourceHTTP, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockSourceHTTP;
    static deserializeBinaryFromReader(
        message: BlockSourceHTTP,
        reader: jspb.BinaryReader
    ): BlockSourceHTTP;
}

export namespace BlockSourceHTTP {
    export type AsObject = {
        url: string;
        rangeBegin: number;
        rangeEnd: number;
    };
}

export class BlockSourceInline extends jspb.Message {
    clearBlockList(): void;
    getBlockList(): Array<Uint8Array | string>;
    getBlockList_asU8(): Array<Uint8Array>;
    getBlockList_asB64(): Array<string>;
    setBlockList(value: Array<Uint8Array | string>): void;
    addBlock(value: Uint8Array | string, index?: number): Uint8Array | string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockSourceInline.AsObject;
    static toObject(includeInstance: boolean, msg: BlockSourceInline): BlockSourceInline.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: BlockSourceInline, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockSourceInline;
    static deserializeBinaryFromReader(
        message: BlockSourceInline,
        reader: jspb.BinaryReader
    ): BlockSourceInline;
}

export namespace BlockSourceInline {
    export type AsObject = {
        blockList: Array<Uint8Array | string>;
    };
}

export class ObjectMetadata extends jspb.Message {
    getObjectSize(): number;
    setObjectSize(value: number): void;

    getBlockSize(): number;
    setBlockSize(value: number): void;

    getEtag(): Uint8Array | string;
    getEtag_asU8(): Uint8Array;
    getEtag_asB64(): string;
    setEtag(value: Uint8Array | string): void;

    getLastModified(): string;
    setLastModified(value: string): void;

    getCacheExpiration(): string;
    setCacheExpiration(value: string): void;

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
        blockSize: number;
        etag: Uint8Array | string;
        lastModified: string;
        cacheExpiration: string;
    };
}

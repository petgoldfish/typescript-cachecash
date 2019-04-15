// package: ccmsg
// file: cachecash.proto

import * as cachecash_pb from './cachecash_pb';
import { grpc } from '@improbable-eng/grpc-web';

type ClientPublisherGetContent = {
    readonly methodName: string;
    readonly service: typeof ClientPublisher;
    readonly requestStream: false;
    readonly responseStream: false;
    readonly requestType: typeof cachecash_pb.ContentRequest;
    readonly responseType: typeof cachecash_pb.ContentResponse;
};

export class ClientPublisher {
    static readonly serviceName: string;
    static readonly GetContent: ClientPublisherGetContent;
}

type ClientCacheGetBlock = {
    readonly methodName: string;
    readonly service: typeof ClientCache;
    readonly requestStream: false;
    readonly responseStream: false;
    readonly requestType: typeof cachecash_pb.ClientCacheRequest;
    readonly responseType: typeof cachecash_pb.ClientCacheResponseData;
};

type ClientCacheExchangeTicketL1 = {
    readonly methodName: string;
    readonly service: typeof ClientCache;
    readonly requestStream: false;
    readonly responseStream: false;
    readonly requestType: typeof cachecash_pb.ClientCacheRequest;
    readonly responseType: typeof cachecash_pb.ClientCacheResponseL1;
};

type ClientCacheExchangeTicketL2 = {
    readonly methodName: string;
    readonly service: typeof ClientCache;
    readonly requestStream: false;
    readonly responseStream: false;
    readonly requestType: typeof cachecash_pb.ClientCacheRequest;
    readonly responseType: typeof cachecash_pb.ClientCacheResponseL2;
};

export class ClientCache {
    static readonly serviceName: string;
    static readonly GetBlock: ClientCacheGetBlock;
    static readonly ExchangeTicketL1: ClientCacheExchangeTicketL1;
    static readonly ExchangeTicketL2: ClientCacheExchangeTicketL2;
}

type CachePublisherCacheMiss = {
    readonly methodName: string;
    readonly service: typeof CachePublisher;
    readonly requestStream: false;
    readonly responseStream: false;
    readonly requestType: typeof cachecash_pb.CacheMissRequest;
    readonly responseType: typeof cachecash_pb.CacheMissResponse;
};

export class CachePublisher {
    static readonly serviceName: string;
    static readonly CacheMiss: CachePublisherCacheMiss;
}

export type ServiceError = { message: string; code: number; metadata: grpc.Metadata };
export type Status = { details: string; code: number; metadata: grpc.Metadata };

interface UnaryResponse {
    cancel(): void;
}
interface ResponseStream<T> {
    cancel(): void;
    on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
    on(type: 'end', handler: () => void): ResponseStream<T>;
    on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
    write(message: T): RequestStream<T>;
    end(): void;
    cancel(): void;
    on(type: 'end', handler: () => void): RequestStream<T>;
    on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
    write(message: ReqT): BidirectionalStream<ReqT, ResT>;
    end(): void;
    cancel(): void;
    on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
    on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
    on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ClientPublisherClient {
    readonly serviceHost: string;

    constructor(serviceHost: string, options?: grpc.RpcOptions);
    getContent(
        requestMessage: cachecash_pb.ContentRequest,
        metadata: grpc.Metadata,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ContentResponse | null
        ) => void
    ): UnaryResponse;
    getContent(
        requestMessage: cachecash_pb.ContentRequest,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ContentResponse | null
        ) => void
    ): UnaryResponse;
}

export class ClientCacheClient {
    readonly serviceHost: string;

    constructor(serviceHost: string, options?: grpc.RpcOptions);
    getBlock(
        requestMessage: cachecash_pb.ClientCacheRequest,
        metadata: grpc.Metadata,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ClientCacheResponseData | null
        ) => void
    ): UnaryResponse;
    getBlock(
        requestMessage: cachecash_pb.ClientCacheRequest,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ClientCacheResponseData | null
        ) => void
    ): UnaryResponse;
    exchangeTicketL1(
        requestMessage: cachecash_pb.ClientCacheRequest,
        metadata: grpc.Metadata,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ClientCacheResponseL1 | null
        ) => void
    ): UnaryResponse;
    exchangeTicketL1(
        requestMessage: cachecash_pb.ClientCacheRequest,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ClientCacheResponseL1 | null
        ) => void
    ): UnaryResponse;
    exchangeTicketL2(
        requestMessage: cachecash_pb.ClientCacheRequest,
        metadata: grpc.Metadata,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ClientCacheResponseL2 | null
        ) => void
    ): UnaryResponse;
    exchangeTicketL2(
        requestMessage: cachecash_pb.ClientCacheRequest,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.ClientCacheResponseL2 | null
        ) => void
    ): UnaryResponse;
}

export class CachePublisherClient {
    readonly serviceHost: string;

    constructor(serviceHost: string, options?: grpc.RpcOptions);
    cacheMiss(
        requestMessage: cachecash_pb.CacheMissRequest,
        metadata: grpc.Metadata,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.CacheMissResponse | null
        ) => void
    ): UnaryResponse;
    cacheMiss(
        requestMessage: cachecash_pb.CacheMissRequest,
        callback: (
            error: ServiceError | null,
            responseMessage: cachecash_pb.CacheMissResponse | null
        ) => void
    ): UnaryResponse;
}

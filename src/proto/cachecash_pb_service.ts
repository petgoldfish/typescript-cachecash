// package: ccmsg
// file: cachecash.proto

import * as cachecash_pb from './cachecash_pb';
export class ClientPublisher {
    static serviceName = 'ccmsg.ClientPublisher';
}
export namespace ClientPublisher {
    export class GetContent {
        static readonly methodName = 'GetContent';
        static readonly service = ClientPublisher;
        static readonly requestStream = false;
        static readonly responseStream = false;
        static readonly requestType = cachecash_pb.ContentRequest;
        static readonly responseType = cachecash_pb.ContentResponse;
    }
}
export class ClientCache {
    static serviceName = 'ccmsg.ClientCache';
}
export namespace ClientCache {
    export class GetBlock {
        static readonly methodName = 'GetBlock';
        static readonly service = ClientCache;
        static readonly requestStream = false;
        static readonly responseStream = false;
        static readonly requestType = cachecash_pb.ClientCacheRequest;
        static readonly responseType = cachecash_pb.ClientCacheResponseData;
    }
    export class ExchangeTicketL1 {
        static readonly methodName = 'ExchangeTicketL1';
        static readonly service = ClientCache;
        static readonly requestStream = false;
        static readonly responseStream = false;
        static readonly requestType = cachecash_pb.ClientCacheRequest;
        static readonly responseType = cachecash_pb.ClientCacheResponseL1;
    }
    export class ExchangeTicketL2 {
        static readonly methodName = 'ExchangeTicketL2';
        static readonly service = ClientCache;
        static readonly requestStream = false;
        static readonly responseStream = false;
        static readonly requestType = cachecash_pb.ClientCacheRequest;
        static readonly responseType = cachecash_pb.ClientCacheResponseL2;
    }
}
export class CachePublisher {
    static serviceName = 'ccmsg.CachePublisher';
}
export namespace CachePublisher {
    export class CacheMiss {
        static readonly methodName = 'CacheMiss';
        static readonly service = CachePublisher;
        static readonly requestStream = false;
        static readonly responseStream = false;
        static readonly requestType = cachecash_pb.CacheMissRequest;
        static readonly responseType = cachecash_pb.CacheMissResponse;
    }
}

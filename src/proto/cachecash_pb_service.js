// package: ccmsg
// file: cachecash.proto

var cachecash_pb = require('./cachecash_pb');
var grpc = require('@improbable-eng/grpc-web').grpc;

var ClientPublisher = (function() {
    function ClientPublisher() {}
    ClientPublisher.serviceName = 'ccmsg.ClientPublisher';
    return ClientPublisher;
})();

ClientPublisher.GetContent = {
    methodName: 'GetContent',
    service: ClientPublisher,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.ContentRequest,
    responseType: cachecash_pb.ContentResponse
};

exports.ClientPublisher = ClientPublisher;

function ClientPublisherClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

ClientPublisherClient.prototype.getContent = function getContent(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(ClientPublisher.GetContent, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

exports.ClientPublisherClient = ClientPublisherClient;

var ClientCache = (function() {
    function ClientCache() {}
    ClientCache.serviceName = 'ccmsg.ClientCache';
    return ClientCache;
})();

ClientCache.GetChunk = {
    methodName: 'GetChunk',
    service: ClientCache,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.ClientCacheRequest,
    responseType: cachecash_pb.ClientCacheResponseData
};

ClientCache.ExchangeTicketL1 = {
    methodName: 'ExchangeTicketL1',
    service: ClientCache,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.ClientCacheRequest,
    responseType: cachecash_pb.ClientCacheResponseL1
};

ClientCache.ExchangeTicketL2 = {
    methodName: 'ExchangeTicketL2',
    service: ClientCache,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.ClientCacheRequest,
    responseType: cachecash_pb.ClientCacheResponseL2
};

exports.ClientCache = ClientCache;

function ClientCacheClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

ClientCacheClient.prototype.getChunk = function getChunk(requestMessage, metadata, callback) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(ClientCache.GetChunk, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

ClientCacheClient.prototype.exchangeTicketL1 = function exchangeTicketL1(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(ClientCache.ExchangeTicketL1, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

ClientCacheClient.prototype.exchangeTicketL2 = function exchangeTicketL2(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(ClientCache.ExchangeTicketL2, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

exports.ClientCacheClient = ClientCacheClient;

var CachePublisher = (function() {
    function CachePublisher() {}
    CachePublisher.serviceName = 'ccmsg.CachePublisher';
    return CachePublisher;
})();

CachePublisher.CacheMiss = {
    methodName: 'CacheMiss',
    service: CachePublisher,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.CacheMissRequest,
    responseType: cachecash_pb.CacheMissResponse
};

exports.CachePublisher = CachePublisher;

function CachePublisherClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

CachePublisherClient.prototype.cacheMiss = function cacheMiss(requestMessage, metadata, callback) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(CachePublisher.CacheMiss, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

exports.CachePublisherClient = CachePublisherClient;

var NodeBootstrapd = (function() {
    function NodeBootstrapd() {}
    NodeBootstrapd.serviceName = 'ccmsg.NodeBootstrapd';
    return NodeBootstrapd;
})();

NodeBootstrapd.AnnounceCache = {
    methodName: 'AnnounceCache',
    service: NodeBootstrapd,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.CacheAnnounceRequest,
    responseType: cachecash_pb.CacheAnnounceResponse
};

NodeBootstrapd.FetchCaches = {
    methodName: 'FetchCaches',
    service: NodeBootstrapd,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.CacheFetchRequest,
    responseType: cachecash_pb.CacheFetchResponse
};

exports.NodeBootstrapd = NodeBootstrapd;

function NodeBootstrapdClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

NodeBootstrapdClient.prototype.announceCache = function announceCache(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(NodeBootstrapd.AnnounceCache, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

NodeBootstrapdClient.prototype.fetchCaches = function fetchCaches(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(NodeBootstrapd.FetchCaches, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

exports.NodeBootstrapdClient = NodeBootstrapdClient;

var PublisherCache = (function() {
    function PublisherCache() {}
    PublisherCache.serviceName = 'ccmsg.PublisherCache';
    return PublisherCache;
})();

PublisherCache.OfferEscrow = {
    methodName: 'OfferEscrow',
    service: PublisherCache,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.EscrowOfferRequest,
    responseType: cachecash_pb.EscrowOfferResponse
};

PublisherCache.PingCache = {
    methodName: 'PingCache',
    service: PublisherCache,
    requestStream: false,
    responseStream: false,
    requestType: cachecash_pb.PingCacheRequest,
    responseType: cachecash_pb.PingCacheResponse
};

exports.PublisherCache = PublisherCache;

function PublisherCacheClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

PublisherCacheClient.prototype.offerEscrow = function offerEscrow(
    requestMessage,
    metadata,
    callback
) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(PublisherCache.OfferEscrow, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

PublisherCacheClient.prototype.pingCache = function pingCache(requestMessage, metadata, callback) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(PublisherCache.PingCache, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function(response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function() {
            callback = null;
            client.close();
        }
    };
};

exports.PublisherCacheClient = PublisherCacheClient;

"use strict";
// This folder contains Tendermint-specific RPC clients
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = exports.HttpClient = exports.instanceOfRpcStreamingClient = void 0;
var rpcclient_1 = require("./rpcclient");
Object.defineProperty(exports, "instanceOfRpcStreamingClient", { enumerable: true, get: function () { return rpcclient_1.instanceOfRpcStreamingClient; } });
var httpclient_1 = require("./httpclient");
Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function () { return httpclient_1.HttpClient; } });
var websocketclient_1 = require("./websocketclient");
Object.defineProperty(exports, "WebsocketClient", { enumerable: true, get: function () { return websocketclient_1.WebsocketClient; } });
//# sourceMappingURL=index.js.map
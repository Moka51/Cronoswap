"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const jsonrpc_1 = require("../../jsonrpc");
const encodings_1 = require("../encodings");
const requests = __importStar(require("../requests"));
function encodeHeightParam(param) {
    return {
        height: encodings_1.may(encodings_1.Integer.encode, param.height),
    };
}
function encodeBlockchainRequestParams(param) {
    return {
        minHeight: encodings_1.may(encodings_1.Integer.encode, param.minHeight),
        maxHeight: encodings_1.may(encodings_1.Integer.encode, param.maxHeight),
    };
}
function encodeAbciQueryParams(params) {
    return {
        path: encodings_1.assertNotEmpty(params.path),
        data: encoding_1.toHex(params.data),
        height: encodings_1.may(encodings_1.Integer.encode, params.height),
        prove: params.prove,
    };
}
function encodeBroadcastTxParams(params) {
    return {
        tx: encoding_1.toBase64(encodings_1.assertNotEmpty(params.tx)),
    };
}
function encodeTxParams(params) {
    return {
        hash: encoding_1.toBase64(encodings_1.assertNotEmpty(params.hash)),
        prove: params.prove,
    };
}
function encodeTxSearchParams(params) {
    return {
        query: params.query,
        prove: params.prove,
        page: encodings_1.may(encodings_1.Integer.encode, params.page),
        per_page: encodings_1.may(encodings_1.Integer.encode, params.per_page),
        order_by: params.order_by,
    };
}
function encodeValidatorsParams(params) {
    return {
        height: encodings_1.may(encodings_1.Integer.encode, params.height),
        page: encodings_1.may(encodings_1.Integer.encode, params.page),
        per_page: encodings_1.may(encodings_1.Integer.encode, params.per_page),
    };
}
class Params {
    static encodeAbciInfo(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method);
    }
    static encodeAbciQuery(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeAbciQueryParams(req.params));
    }
    static encodeBlock(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeHeightParam(req.params));
    }
    static encodeBlockchain(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeBlockchainRequestParams(req.params));
    }
    static encodeBlockResults(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeHeightParam(req.params));
    }
    static encodeBroadcastTx(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeBroadcastTxParams(req.params));
    }
    static encodeCommit(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeHeightParam(req.params));
    }
    static encodeGenesis(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method);
    }
    static encodeHealth(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method);
    }
    static encodeStatus(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method);
    }
    static encodeSubscribe(req) {
        const eventTag = { key: "tm.event", value: req.query.type };
        const query = requests.buildQuery({ tags: [eventTag], raw: req.query.raw });
        return jsonrpc_1.createJsonRpcRequest("subscribe", { query: query });
    }
    static encodeTx(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeTxParams(req.params));
    }
    // TODO: encode params for query string???
    static encodeTxSearch(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeTxSearchParams(req.params));
    }
    static encodeValidators(req) {
        return jsonrpc_1.createJsonRpcRequest(req.method, encodeValidatorsParams(req.params));
    }
}
exports.Params = Params;
//# sourceMappingURL=requests.js.map
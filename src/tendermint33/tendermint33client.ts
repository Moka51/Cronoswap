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
exports.Tendermint33Client = void 0;
const jsonrpc_1 = require("../jsonrpc");
const rpcclients_1 = require("../rpcclients");
const adaptor_1 = require("./adaptor");
const requests = __importStar(require("./requests"));
class Tendermint33Client {
    /**
     * Use `Tendermint33Client.connect` or `Tendermint33Client.create` to create an instance.
     */
    constructor(client) {
        this.client = client;
        this.p = adaptor_1.adaptor33.params;
        this.r = adaptor_1.adaptor33.responses;
    }
    /**
     * Creates a new Tendermint client for the given endpoint.
     *
     * Uses HTTP when the URL schema is http or https. Uses WebSockets otherwise.
     */
    static async connect(url) {
        const useHttp = url.startsWith("http://") || url.startsWith("https://");
        const rpcClient = useHttp ? new rpcclients_1.HttpClient(url) : new rpcclients_1.WebsocketClient(url);
        return Tendermint33Client.create(rpcClient);
    }
    /**
     * Creates a new Tendermint client given an RPC client.
     */
    static async create(rpcClient) {
        // For some very strange reason I don't understand, tests start to fail on some systems
        // (our CI) when skipping the status call before doing other queries. Sleeping a little
        // while did not help. Thus we query the version as a way to say "hi" to the backend,
        // even in cases where we don't use the result.
        const _version = await this.detectVersion(rpcClient);
        return new Tendermint33Client(rpcClient);
    }
    static async detectVersion(client) {
        const req = jsonrpc_1.createJsonRpcRequest(requests.Method.Status);
        const response = await client.execute(req);
        const result = response.result;
        if (!result || !result.node_info) {
            throw new Error("Unrecognized format for status response");
        }
        const version = result.node_info.version;
        if (typeof version !== "string") {
            throw new Error("Unrecognized version format: must be string");
        }
        return version;
    }
    disconnect() {
        this.client.disconnect();
    }
    async abciInfo() {
        const query = { method: requests.Method.AbciInfo };
        return this.doCall(query, this.p.encodeAbciInfo, this.r.decodeAbciInfo);
    }
    async abciQuery(params) {
        const query = { params: params, method: requests.Method.AbciQuery };
        return this.doCall(query, this.p.encodeAbciQuery, this.r.decodeAbciQuery);
    }
    async block(height) {
        const query = { method: requests.Method.Block, params: { height: height } };
        return this.doCall(query, this.p.encodeBlock, this.r.decodeBlock);
    }
    async blockResults(height) {
        const query = {
            method: requests.Method.BlockResults,
            params: { height: height },
        };
        return this.doCall(query, this.p.encodeBlockResults, this.r.decodeBlockResults);
    }
    /**
     * Queries block headers filtered by minHeight <= height <= maxHeight.
     *
     * @param minHeight The minimum height to be included in the result. Defaults to 0.
     * @param maxHeight The maximum height to be included in the result. Defaults to infinity.
     */
    async blockchain(minHeight, maxHeight) {
        const query = {
            method: requests.Method.Blockchain,
            params: {
                minHeight: minHeight,
                maxHeight: maxHeight,
            },
        };
        return this.doCall(query, this.p.encodeBlockchain, this.r.decodeBlockchain);
    }
    /**
     * Broadcast transaction to mempool and wait for response
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
     */
    async broadcastTxSync(params) {
        const query = { params: params, method: requests.Method.BroadcastTxSync };
        return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxSync);
    }
    /**
     * Broadcast transaction to mempool and do not wait for result
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
     */
    async broadcastTxAsync(params) {
        const query = { params: params, method: requests.Method.BroadcastTxAsync };
        return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxAsync);
    }
    /**
     * Broadcast transaction to mempool and wait for block
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_commit
     */
    async broadcastTxCommit(params) {
        const query = { params: params, method: requests.Method.BroadcastTxCommit };
        return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxCommit);
    }
    async commit(height) {
        const query = { method: requests.Method.Commit, params: { height: height } };
        return this.doCall(query, this.p.encodeCommit, this.r.decodeCommit);
    }
    async genesis() {
        const query = { method: requests.Method.Genesis };
        return this.doCall(query, this.p.encodeGenesis, this.r.decodeGenesis);
    }
    async health() {
        const query = { method: requests.Method.Health };
        return this.doCall(query, this.p.encodeHealth, this.r.decodeHealth);
    }
    async status() {
        const query = { method: requests.Method.Status };
        return this.doCall(query, this.p.encodeStatus, this.r.decodeStatus);
    }
    subscribeNewBlock() {
        const request = {
            method: requests.Method.Subscribe,
            query: { type: requests.SubscriptionEventType.NewBlock },
        };
        return this.subscribe(request, this.r.decodeNewBlockEvent);
    }
    subscribeNewBlockHeader() {
        const request = {
            method: requests.Method.Subscribe,
            query: { type: requests.SubscriptionEventType.NewBlockHeader },
        };
        return this.subscribe(request, this.r.decodeNewBlockHeaderEvent);
    }
    subscribeTx(query) {
        const request = {
            method: requests.Method.Subscribe,
            query: {
                type: requests.SubscriptionEventType.Tx,
                raw: query,
            },
        };
        return this.subscribe(request, this.r.decodeTxEvent);
    }
    /**
     * Get a single transaction by hash
     *
     * @see https://docs.tendermint.com/master/rpc/#/Info/tx
     */
    async tx(params) {
        const query = { params: params, method: requests.Method.Tx };
        return this.doCall(query, this.p.encodeTx, this.r.decodeTx);
    }
    /**
     * Search for transactions that are in a block
     *
     * @see https://docs.tendermint.com/master/rpc/#/Info/tx_search
     */
    async txSearch(params) {
        const query = { params: params, method: requests.Method.TxSearch };
        return this.doCall(query, this.p.encodeTxSearch, this.r.decodeTxSearch);
    }
    // this should paginate through all txSearch options to ensure it returns all results.
    // starts with page 1 or whatever was provided (eg. to start on page 7)
    async txSearchAll(params) {
        let page = params.page || 1;
        const txs = [];
        let done = false;
        while (!done) {
            const resp = await this.txSearch(Object.assign(Object.assign({}, params), { page: page }));
            txs.push(...resp.txs);
            if (txs.length < resp.totalCount) {
                page++;
            }
            else {
                done = true;
            }
        }
        return {
            totalCount: txs.length,
            txs: txs,
        };
    }
    async validators(params) {
        const query = {
            method: requests.Method.Validators,
            params: params,
        };
        return this.doCall(query, this.p.encodeValidators, this.r.decodeValidators);
    }
    async validatorsAll(height) {
        const validators = [];
        let page = 1;
        let done = false;
        let blockHeight = height;
        while (!done) {
            const response = await this.validators({
                per_page: 50,
                height: blockHeight,
                page: page,
            });
            validators.push(...response.validators);
            blockHeight = blockHeight || response.blockHeight;
            if (validators.length < response.total) {
                page++;
            }
            else {
                done = true;
            }
        }
        return {
            // NOTE: Default value is for type safety but this should always be set
            blockHeight: blockHeight !== null && blockHeight !== void 0 ? blockHeight : 0,
            count: validators.length,
            total: validators.length,
            validators: validators,
        };
    }
    // doCall is a helper to handle the encode/call/decode logic
    async doCall(request, encode, decode) {
        const req = encode(request);
        const result = await this.client.execute(req);
        return decode(result);
    }
    subscribe(request, decode) {
        if (!rpcclients_1.instanceOfRpcStreamingClient(this.client)) {
            throw new Error("This RPC client type cannot subscribe to events");
        }
        const req = this.p.encodeSubscribe(request);
        const eventStream = this.client.listen(req);
        return eventStream.map((event) => {
            return decode(event);
        });
    }
}
exports.Tendermint33Client = Tendermint33Client;
//# sourceMappingURL=tendermint33client.js.map
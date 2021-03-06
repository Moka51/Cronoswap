"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAuthExtension = void 0;
const query_1 = require("cosmjs-types/cosmos/auth/v1beta1/query");
const any_1 = require("cosmjs-types/google/protobuf/any");
const utils_1 = require("./utils");
function setupAuthExtension(base) {
    const rpc = utils_1.createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        auth: {
            account: async (address) => {
                const { account } = await queryService.Account({ address: address });
                return account !== null && account !== void 0 ? account : null;
            },
            verified: {
                account: async (address) => {
                    // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L29-L32
                    const key = Uint8Array.from([0x01, ...utils_1.toAccAddress(address)]);
                    const responseData = await base.queryVerified("acc", key);
                    if (responseData.length === 0)
                        return null;
                    return any_1.Any.decode(responseData);
                },
            },
        },
    };
}
exports.setupAuthExtension = setupAuthExtension;
//# sourceMappingURL=auth.js.map
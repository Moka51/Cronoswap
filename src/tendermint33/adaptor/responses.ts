"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responses = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const utils_1 = require("@cosmjs/utils");
const dates_1 = require("../../dates");
const types_1 = require("../../types");
const encodings_1 = require("../encodings");
const hasher_1 = require("../hasher");
function decodeAbciInfo(data) {
    return {
        data: data.data,
        lastBlockHeight: encodings_1.may(encodings_1.Integer.parse, data.last_block_height),
        lastBlockAppHash: encodings_1.may(encoding_1.fromBase64, data.last_block_app_hash),
    };
}
function decodeQueryProof(data) {
    return {
        ops: data.ops.map((op) => ({
            type: op.type,
            key: encoding_1.fromBase64(op.key),
            data: encoding_1.fromBase64(op.data),
        })),
    };
}
function decodeAbciQuery(data) {
    return {
        key: encoding_1.fromBase64(encodings_1.optional(data.key, "")),
        value: encoding_1.fromBase64(encodings_1.optional(data.value, "")),
        proof: encodings_1.may(decodeQueryProof, data.proofOps),
        height: encodings_1.may(encodings_1.Integer.parse, data.height),
        code: encodings_1.may(encodings_1.Integer.parse, data.code),
        index: encodings_1.may(encodings_1.Integer.parse, data.index),
        log: data.log,
    };
}
function decodeAttribute(attribute) {
    return {
        key: encoding_1.fromBase64(encodings_1.assertNotEmpty(attribute.key)),
        value: encoding_1.fromBase64(encodings_1.optional(attribute.value, "")),
    };
}
function decodeAttributes(attributes) {
    return encodings_1.assertArray(attributes).map(decodeAttribute);
}
function decodeEvent(event) {
    return {
        type: event.type,
        attributes: decodeAttributes(event.attributes),
    };
}
function decodeEvents(events) {
    return encodings_1.assertArray(events !== null && events !== void 0 ? events : []).map(decodeEvent);
}
function decodeTxData(data) {
    return {
        data: encodings_1.may(encoding_1.fromBase64, data.data),
        log: data.log,
        code: encodings_1.Integer.parse(encodings_1.assertNumber(encodings_1.optional(data.code, 0))),
        events: decodeEvents(data.events),
    };
}
function decodePubkey(data) {
    switch (data.type) {
        // go-amino special code
        case "tendermint/PubKeyEd25519":
            return {
                algorithm: "ed25519",
                data: encoding_1.fromBase64(encodings_1.assertNotEmpty(data.value)),
            };
        case "tendermint/PubKeySecp256k1":
            return {
                algorithm: "secp256k1",
                data: encoding_1.fromBase64(encodings_1.assertNotEmpty(data.value)),
            };
        default:
            throw new Error(`unknown pubkey type: ${data.type}`);
    }
}
function decodeValidatorUpdate(data) {
    return {
        pubkey: decodePubkey(encodings_1.assertObject(data.pub_key)),
        votingPower: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.voting_power)),
        address: encoding_1.fromHex(encodings_1.assertNotEmpty(data.address)),
        proposerPriority: encodings_1.Integer.parse(data.proposer_priority),
    };
}
/**
 * Note: we do not parse block.time_iota_ms for now because of this CHANGELOG entry
 *
 * > Add time_iota_ms to block's consensus parameters (not exposed to the application)
 * https://github.com/tendermint/tendermint/blob/master/CHANGELOG.md#v0310
 */
function decodeBlockParams(data) {
    return {
        maxBytes: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.max_bytes)),
        maxGas: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.max_gas)),
    };
}
function decodeEvidenceParams(data) {
    return {
        maxAgeNumBlocks: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.max_age_num_blocks)),
        maxAgeDuration: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.max_age_duration)),
    };
}
function decodeConsensusParams(data) {
    return {
        block: decodeBlockParams(encodings_1.assertObject(data.block)),
        evidence: decodeEvidenceParams(encodings_1.assertObject(data.evidence)),
    };
}
function decodeBlockResults(data) {
    return {
        height: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.height)),
        results: (data.txs_results || []).map(decodeTxData),
        validatorUpdates: (data.validator_updates || []).map(decodeValidatorUpdate),
        consensusUpdates: encodings_1.may(decodeConsensusParams, data.consensus_param_updates),
        beginBlockEvents: decodeEvents(data.begin_block_events || []),
        endBlockEvents: decodeEvents(data.end_block_events || []),
    };
}
function decodeBlockId(data) {
    return {
        hash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.hash)),
        parts: {
            total: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.parts.total)),
            hash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.parts.hash)),
        },
    };
}
function decodeBlockVersion(data) {
    var _a;
    return {
        block: encodings_1.Integer.parse(data.block),
        app: encodings_1.Integer.parse((_a = data.app) !== null && _a !== void 0 ? _a : 0),
    };
}
function decodeHeader(data) {
    return {
        version: decodeBlockVersion(data.version),
        chainId: encodings_1.assertNotEmpty(data.chain_id),
        height: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.height)),
        time: dates_1.fromRfc3339WithNanoseconds(encodings_1.assertNotEmpty(data.time)),
        lastBlockId: decodeBlockId(data.last_block_id),
        lastCommitHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.last_commit_hash)),
        dataHash: encoding_1.fromHex(encodings_1.assertSet(data.data_hash)),
        validatorsHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.validators_hash)),
        nextValidatorsHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.next_validators_hash)),
        consensusHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.consensus_hash)),
        appHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.app_hash)),
        lastResultsHash: encoding_1.fromHex(encodings_1.assertSet(data.last_results_hash)),
        evidenceHash: encoding_1.fromHex(encodings_1.assertSet(data.evidence_hash)),
        proposerAddress: encoding_1.fromHex(encodings_1.assertNotEmpty(data.proposer_address)),
    };
}
function decodeBlockMeta(data) {
    return {
        blockId: decodeBlockId(data.block_id),
        header: decodeHeader(data.header),
    };
}
function decodeBlockchain(data) {
    return {
        lastHeight: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.last_height)),
        blockMetas: encodings_1.assertArray(data.block_metas).map(decodeBlockMeta),
    };
}
function decodeBroadcastTxSync(data) {
    return Object.assign(Object.assign({}, decodeTxData(data)), { hash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.hash)) });
}
function decodeBroadcastTxCommit(data) {
    return {
        height: encodings_1.Integer.parse(data.height),
        hash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.hash)),
        checkTx: decodeTxData(encodings_1.assertObject(data.check_tx)),
        deliverTx: encodings_1.may(decodeTxData, data.deliver_tx),
    };
}
function decodeBlockIdFlag(blockIdFlag) {
    utils_1.assert(blockIdFlag in types_1.BlockIdFlag);
    return blockIdFlag;
}
function decodeCommitSignature(data) {
    return {
        blockIdFlag: decodeBlockIdFlag(data.block_id_flag),
        validatorAddress: encoding_1.fromHex(data.validator_address),
        timestamp: dates_1.fromRfc3339WithNanoseconds(encodings_1.assertNotEmpty(data.timestamp)),
        signature: encoding_1.fromBase64(encodings_1.assertNotEmpty(data.signature)),
    };
}
function decodeCommit(data) {
    return {
        blockId: decodeBlockId(encodings_1.assertObject(data.block_id)),
        height: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.height)),
        round: encodings_1.Integer.parse(data.round),
        signatures: encodings_1.assertArray(data.signatures).map(decodeCommitSignature),
    };
}
function decodeCommitResponse(data) {
    return {
        canonical: encodings_1.assertBoolean(data.canonical),
        header: decodeHeader(data.signed_header.header),
        commit: decodeCommit(data.signed_header.commit),
    };
}
function decodeValidatorGenesis(data) {
    return {
        address: encoding_1.fromHex(encodings_1.assertNotEmpty(data.address)),
        pubkey: decodePubkey(encodings_1.assertObject(data.pub_key)),
        votingPower: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.power)),
    };
}
function decodeGenesis(data) {
    return {
        genesisTime: dates_1.fromRfc3339WithNanoseconds(encodings_1.assertNotEmpty(data.genesis_time)),
        chainId: encodings_1.assertNotEmpty(data.chain_id),
        consensusParams: decodeConsensusParams(data.consensus_params),
        validators: data.validators ? encodings_1.assertArray(data.validators).map(decodeValidatorGenesis) : [],
        appHash: encoding_1.fromHex(encodings_1.assertSet(data.app_hash)),
        appState: data.app_state,
    };
}
function decodeValidatorInfo(data) {
    return {
        pubkey: decodePubkey(encodings_1.assertObject(data.pub_key)),
        votingPower: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.voting_power)),
        address: encoding_1.fromHex(encodings_1.assertNotEmpty(data.address)),
    };
}
function decodeNodeInfo(data) {
    return {
        id: encoding_1.fromHex(encodings_1.assertNotEmpty(data.id)),
        listenAddr: encodings_1.assertNotEmpty(data.listen_addr),
        network: encodings_1.assertNotEmpty(data.network),
        version: encodings_1.assertString(data.version),
        channels: encodings_1.assertNotEmpty(data.channels),
        moniker: encodings_1.assertNotEmpty(data.moniker),
        other: encodings_1.dictionaryToStringMap(data.other),
        protocolVersion: {
            app: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.protocol_version.app)),
            block: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.protocol_version.block)),
            p2p: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.protocol_version.p2p)),
        },
    };
}
function decodeSyncInfo(data) {
    return {
        latestBlockHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.latest_block_hash)),
        latestAppHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.latest_app_hash)),
        latestBlockTime: dates_1.fromRfc3339WithNanoseconds(encodings_1.assertNotEmpty(data.latest_block_time)),
        latestBlockHeight: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.latest_block_height)),
        catchingUp: encodings_1.assertBoolean(data.catching_up),
    };
}
function decodeStatus(data) {
    return {
        nodeInfo: decodeNodeInfo(data.node_info),
        syncInfo: decodeSyncInfo(data.sync_info),
        validatorInfo: decodeValidatorInfo(data.validator_info),
    };
}
function decodeTxProof(data) {
    return {
        data: encoding_1.fromBase64(encodings_1.assertNotEmpty(data.data)),
        rootHash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.root_hash)),
        proof: {
            total: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.proof.total)),
            index: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.proof.index)),
            leafHash: encoding_1.fromBase64(encodings_1.assertNotEmpty(data.proof.leaf_hash)),
            aunts: encodings_1.assertArray(data.proof.aunts).map(encoding_1.fromBase64),
        },
    };
}
function decodeTxResponse(data) {
    return {
        tx: encoding_1.fromBase64(encodings_1.assertNotEmpty(data.tx)),
        result: decodeTxData(encodings_1.assertObject(data.tx_result)),
        height: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.height)),
        index: encodings_1.Integer.parse(encodings_1.assertNumber(data.index)),
        hash: encoding_1.fromHex(encodings_1.assertNotEmpty(data.hash)),
        proof: encodings_1.may(decodeTxProof, data.proof),
    };
}
function decodeTxSearch(data) {
    return {
        totalCount: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.total_count)),
        txs: encodings_1.assertArray(data.txs).map(decodeTxResponse),
    };
}
function decodeTxEvent(data) {
    const tx = encoding_1.fromBase64(encodings_1.assertNotEmpty(data.tx));
    return {
        tx: tx,
        hash: hasher_1.hashTx(tx),
        result: decodeTxData(data.result),
        height: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.height)),
        index: encodings_1.may(encodings_1.Integer.parse, data.index),
    };
}
function decodeValidators(data) {
    return {
        blockHeight: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.block_height)),
        validators: encodings_1.assertArray(data.validators).map(decodeValidatorUpdate),
        count: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.count)),
        total: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.total)),
    };
}
function decodeEvidence(data) {
    return {
        type: encodings_1.assertNotEmpty(data.type),
        height: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.height)),
        time: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.time)),
        totalVotingPower: encodings_1.Integer.parse(encodings_1.assertNotEmpty(data.totalVotingPower)),
        validator: decodeValidatorUpdate(data.validator),
    };
}
function decodeEvidences(ev) {
    return encodings_1.assertArray(ev).map(decodeEvidence);
}
function decodeBlock(data) {
    return {
        header: decodeHeader(encodings_1.assertObject(data.header)),
        lastCommit: decodeCommit(encodings_1.assertObject(data.last_commit)),
        txs: data.data.txs ? encodings_1.assertArray(data.data.txs).map(encoding_1.fromBase64) : [],
        evidence: data.evidence && encodings_1.may(decodeEvidences, data.evidence.evidence),
    };
}
function decodeBlockResponse(data) {
    return {
        blockId: decodeBlockId(data.block_id),
        block: decodeBlock(data.block),
    };
}
class Responses {
    static decodeAbciInfo(response) {
        return decodeAbciInfo(encodings_1.assertObject(response.result.response));
    }
    static decodeAbciQuery(response) {
        return decodeAbciQuery(encodings_1.assertObject(response.result.response));
    }
    static decodeBlock(response) {
        return decodeBlockResponse(response.result);
    }
    static decodeBlockResults(response) {
        return decodeBlockResults(response.result);
    }
    static decodeBlockchain(response) {
        return decodeBlockchain(response.result);
    }
    static decodeBroadcastTxSync(response) {
        return decodeBroadcastTxSync(response.result);
    }
    static decodeBroadcastTxAsync(response) {
        return Responses.decodeBroadcastTxSync(response);
    }
    static decodeBroadcastTxCommit(response) {
        return decodeBroadcastTxCommit(response.result);
    }
    static decodeCommit(response) {
        return decodeCommitResponse(response.result);
    }
    static decodeGenesis(response) {
        return decodeGenesis(encodings_1.assertObject(response.result.genesis));
    }
    static decodeHealth() {
        return null;
    }
    static decodeStatus(response) {
        return decodeStatus(response.result);
    }
    static decodeNewBlockEvent(event) {
        return decodeBlock(event.data.value.block);
    }
    static decodeNewBlockHeaderEvent(event) {
        return decodeHeader(event.data.value.header);
    }
    static decodeTxEvent(event) {
        return decodeTxEvent(event.data.value.TxResult);
    }
    static decodeTx(response) {
        return decodeTxResponse(response.result);
    }
    static decodeTxSearch(response) {
        return decodeTxSearch(response.result);
    }
    static decodeValidators(response) {
        return decodeValidators(response.result);
    }
}
exports.Responses = Responses;
//# sourceMappingURL=responses.js.map
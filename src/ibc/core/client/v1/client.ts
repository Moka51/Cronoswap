"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.Height = exports.ClientUpdateProposal = exports.ClientConsensusStates = exports.ConsensusStateWithHeight = exports.IdentifiedClientState = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../../google/protobuf/any");
exports.protobufPackage = "ibc.core.client.v1";
const baseIdentifiedClientState = { clientId: "" };
exports.IdentifiedClientState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseIdentifiedClientState);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseIdentifiedClientState);
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        }
        else {
            message.clientId = "";
        }
        if (object.clientState !== undefined && object.clientState !== null) {
            message.clientState = any_1.Any.fromJSON(object.clientState);
        }
        else {
            message.clientState = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.clientState !== undefined &&
            (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseIdentifiedClientState);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        if (object.clientState !== undefined && object.clientState !== null) {
            message.clientState = any_1.Any.fromPartial(object.clientState);
        }
        else {
            message.clientState = undefined;
        }
        return message;
    },
};
const baseConsensusStateWithHeight = {};
exports.ConsensusStateWithHeight = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.height !== undefined) {
            exports.Height.encode(message.height, writer.uint32(10).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            any_1.Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseConsensusStateWithHeight);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = exports.Height.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.consensusState = any_1.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseConsensusStateWithHeight);
        if (object.height !== undefined && object.height !== null) {
            message.height = exports.Height.fromJSON(object.height);
        }
        else {
            message.height = undefined;
        }
        if (object.consensusState !== undefined && object.consensusState !== null) {
            message.consensusState = any_1.Any.fromJSON(object.consensusState);
        }
        else {
            message.consensusState = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = message.height ? exports.Height.toJSON(message.height) : undefined);
        message.consensusState !== undefined &&
            (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseConsensusStateWithHeight);
        if (object.height !== undefined && object.height !== null) {
            message.height = exports.Height.fromPartial(object.height);
        }
        else {
            message.height = undefined;
        }
        if (object.consensusState !== undefined && object.consensusState !== null) {
            message.consensusState = any_1.Any.fromPartial(object.consensusState);
        }
        else {
            message.consensusState = undefined;
        }
        return message;
    },
};
const baseClientConsensusStates = { clientId: "" };
exports.ClientConsensusStates = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        for (const v of message.consensusStates) {
            exports.ConsensusStateWithHeight.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseClientConsensusStates);
        message.consensusStates = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.consensusStates.push(exports.ConsensusStateWithHeight.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseClientConsensusStates);
        message.consensusStates = [];
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        }
        else {
            message.clientId = "";
        }
        if (object.consensusStates !== undefined && object.consensusStates !== null) {
            for (const e of object.consensusStates) {
                message.consensusStates.push(exports.ConsensusStateWithHeight.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        if (message.consensusStates) {
            obj.consensusStates = message.consensusStates.map((e) => e ? exports.ConsensusStateWithHeight.toJSON(e) : undefined);
        }
        else {
            obj.consensusStates = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseClientConsensusStates);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.consensusStates = [];
        if (object.consensusStates !== undefined && object.consensusStates !== null) {
            for (const e of object.consensusStates) {
                message.consensusStates.push(exports.ConsensusStateWithHeight.fromPartial(e));
            }
        }
        return message;
    },
};
const baseClientUpdateProposal = { title: "", description: "", clientId: "" };
exports.ClientUpdateProposal = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.clientId !== "") {
            writer.uint32(26).string(message.clientId);
        }
        if (message.header !== undefined) {
            any_1.Any.encode(message.header, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseClientUpdateProposal);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.title = reader.string();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.clientId = reader.string();
                    break;
                case 4:
                    message.header = any_1.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseClientUpdateProposal);
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title);
        }
        else {
            message.title = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        }
        else {
            message.clientId = "";
        }
        if (object.header !== undefined && object.header !== null) {
            message.header = any_1.Any.fromJSON(object.header);
        }
        else {
            message.header = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined && (obj.description = message.description);
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.header !== undefined && (obj.header = message.header ? any_1.Any.toJSON(message.header) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseClientUpdateProposal);
        message.title = (_a = object.title) !== null && _a !== void 0 ? _a : "";
        message.description = (_b = object.description) !== null && _b !== void 0 ? _b : "";
        message.clientId = (_c = object.clientId) !== null && _c !== void 0 ? _c : "";
        if (object.header !== undefined && object.header !== null) {
            message.header = any_1.Any.fromPartial(object.header);
        }
        else {
            message.header = undefined;
        }
        return message;
    },
};
const baseHeight = { revisionNumber: long_1.default.UZERO, revisionHeight: long_1.default.UZERO };
exports.Height = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.revisionNumber.isZero()) {
            writer.uint32(8).uint64(message.revisionNumber);
        }
        if (!message.revisionHeight.isZero()) {
            writer.uint32(16).uint64(message.revisionHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseHeight);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.revisionNumber = reader.uint64();
                    break;
                case 2:
                    message.revisionHeight = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseHeight);
        if (object.revisionNumber !== undefined && object.revisionNumber !== null) {
            message.revisionNumber = long_1.default.fromString(object.revisionNumber);
        }
        else {
            message.revisionNumber = long_1.default.UZERO;
        }
        if (object.revisionHeight !== undefined && object.revisionHeight !== null) {
            message.revisionHeight = long_1.default.fromString(object.revisionHeight);
        }
        else {
            message.revisionHeight = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.revisionNumber !== undefined &&
            (obj.revisionNumber = (message.revisionNumber || long_1.default.UZERO).toString());
        message.revisionHeight !== undefined &&
            (obj.revisionHeight = (message.revisionHeight || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseHeight);
        if (object.revisionNumber !== undefined && object.revisionNumber !== null) {
            message.revisionNumber = object.revisionNumber;
        }
        else {
            message.revisionNumber = long_1.default.UZERO;
        }
        if (object.revisionHeight !== undefined && object.revisionHeight !== null) {
            message.revisionHeight = object.revisionHeight;
        }
        else {
            message.revisionHeight = long_1.default.UZERO;
        }
        return message;
    },
};
const baseParams = { allowedClients: "" };
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.allowedClients) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseParams);
        message.allowedClients = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.allowedClients.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseParams);
        message.allowedClients = [];
        if (object.allowedClients !== undefined && object.allowedClients !== null) {
            for (const e of object.allowedClients) {
                message.allowedClients.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.allowedClients) {
            obj.allowedClients = message.allowedClients.map((e) => e);
        }
        else {
            obj.allowedClients = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseParams);
        message.allowedClients = [];
        if (object.allowedClients !== undefined && object.allowedClients !== null) {
            for (const e of object.allowedClients) {
                message.allowedClients.push(e);
            }
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=client.js.map
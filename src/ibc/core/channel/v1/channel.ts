"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acknowledgement = exports.PacketState = exports.Packet = exports.Counterparty = exports.IdentifiedChannel = exports.Channel = exports.orderToJSON = exports.orderFromJSON = exports.Order = exports.stateToJSON = exports.stateFromJSON = exports.State = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const client_1 = require("../../../../ibc/core/client/v1/client");
exports.protobufPackage = "ibc.core.channel.v1";
/**
 * State defines if a channel is in one of the following states:
 * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
var State;
(function (State) {
    /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
    State[State["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
    /** STATE_INIT - A channel has just started the opening handshake. */
    State[State["STATE_INIT"] = 1] = "STATE_INIT";
    /** STATE_TRYOPEN - A channel has acknowledged the handshake step on the counterparty chain. */
    State[State["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
    /**
     * STATE_OPEN - A channel has completed the handshake. Open channels are
     * ready to send and receive packets.
     */
    State[State["STATE_OPEN"] = 3] = "STATE_OPEN";
    /**
     * STATE_CLOSED - A channel has been closed and can no longer be used to send or receive
     * packets.
     */
    State[State["STATE_CLOSED"] = 4] = "STATE_CLOSED";
    State[State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(State = exports.State || (exports.State = {}));
function stateFromJSON(object) {
    switch (object) {
        case 0:
        case "STATE_UNINITIALIZED_UNSPECIFIED":
            return State.STATE_UNINITIALIZED_UNSPECIFIED;
        case 1:
        case "STATE_INIT":
            return State.STATE_INIT;
        case 2:
        case "STATE_TRYOPEN":
            return State.STATE_TRYOPEN;
        case 3:
        case "STATE_OPEN":
            return State.STATE_OPEN;
        case 4:
        case "STATE_CLOSED":
            return State.STATE_CLOSED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return State.UNRECOGNIZED;
    }
}
exports.stateFromJSON = stateFromJSON;
function stateToJSON(object) {
    switch (object) {
        case State.STATE_UNINITIALIZED_UNSPECIFIED:
            return "STATE_UNINITIALIZED_UNSPECIFIED";
        case State.STATE_INIT:
            return "STATE_INIT";
        case State.STATE_TRYOPEN:
            return "STATE_TRYOPEN";
        case State.STATE_OPEN:
            return "STATE_OPEN";
        case State.STATE_CLOSED:
            return "STATE_CLOSED";
        default:
            return "UNKNOWN";
    }
}
exports.stateToJSON = stateToJSON;
/** Order defines if a channel is ORDERED or UNORDERED */
var Order;
(function (Order) {
    /** ORDER_NONE_UNSPECIFIED - zero-value for channel ordering */
    Order[Order["ORDER_NONE_UNSPECIFIED"] = 0] = "ORDER_NONE_UNSPECIFIED";
    /**
     * ORDER_UNORDERED - packets can be delivered in any order, which may differ from the order in
     * which they were sent.
     */
    Order[Order["ORDER_UNORDERED"] = 1] = "ORDER_UNORDERED";
    /** ORDER_ORDERED - packets are delivered exactly in the order which they were sent */
    Order[Order["ORDER_ORDERED"] = 2] = "ORDER_ORDERED";
    Order[Order["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Order = exports.Order || (exports.Order = {}));
function orderFromJSON(object) {
    switch (object) {
        case 0:
        case "ORDER_NONE_UNSPECIFIED":
            return Order.ORDER_NONE_UNSPECIFIED;
        case 1:
        case "ORDER_UNORDERED":
            return Order.ORDER_UNORDERED;
        case 2:
        case "ORDER_ORDERED":
            return Order.ORDER_ORDERED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Order.UNRECOGNIZED;
    }
}
exports.orderFromJSON = orderFromJSON;
function orderToJSON(object) {
    switch (object) {
        case Order.ORDER_NONE_UNSPECIFIED:
            return "ORDER_NONE_UNSPECIFIED";
        case Order.ORDER_UNORDERED:
            return "ORDER_UNORDERED";
        case Order.ORDER_ORDERED:
            return "ORDER_ORDERED";
        default:
            return "UNKNOWN";
    }
}
exports.orderToJSON = orderToJSON;
const baseChannel = { state: 0, ordering: 0, connectionHops: "", version: "" };
exports.Channel = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
        }
        if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
        }
        if (message.counterparty !== undefined) {
            exports.Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.connectionHops) {
            writer.uint32(34).string(v);
        }
        if (message.version !== "") {
            writer.uint32(42).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseChannel);
        message.connectionHops = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                case 2:
                    message.ordering = reader.int32();
                    break;
                case 3:
                    message.counterparty = exports.Counterparty.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.connectionHops.push(reader.string());
                    break;
                case 5:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseChannel);
        message.connectionHops = [];
        if (object.state !== undefined && object.state !== null) {
            message.state = stateFromJSON(object.state);
        }
        else {
            message.state = 0;
        }
        if (object.ordering !== undefined && object.ordering !== null) {
            message.ordering = orderFromJSON(object.ordering);
        }
        else {
            message.ordering = 0;
        }
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromJSON(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        if (object.connectionHops !== undefined && object.connectionHops !== null) {
            for (const e of object.connectionHops) {
                message.connectionHops.push(String(e));
            }
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = String(object.version);
        }
        else {
            message.version = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.state !== undefined && (obj.state = stateToJSON(message.state));
        message.ordering !== undefined && (obj.ordering = orderToJSON(message.ordering));
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty ? exports.Counterparty.toJSON(message.counterparty) : undefined);
        if (message.connectionHops) {
            obj.connectionHops = message.connectionHops.map((e) => e);
        }
        else {
            obj.connectionHops = [];
        }
        message.version !== undefined && (obj.version = message.version);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseChannel);
        message.state = (_a = object.state) !== null && _a !== void 0 ? _a : 0;
        message.ordering = (_b = object.ordering) !== null && _b !== void 0 ? _b : 0;
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromPartial(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        message.connectionHops = [];
        if (object.connectionHops !== undefined && object.connectionHops !== null) {
            for (const e of object.connectionHops) {
                message.connectionHops.push(e);
            }
        }
        message.version = (_c = object.version) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseIdentifiedChannel = {
    state: 0,
    ordering: 0,
    connectionHops: "",
    version: "",
    portId: "",
    channelId: "",
};
exports.IdentifiedChannel = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
        }
        if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
        }
        if (message.counterparty !== undefined) {
            exports.Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.connectionHops) {
            writer.uint32(34).string(v);
        }
        if (message.version !== "") {
            writer.uint32(42).string(message.version);
        }
        if (message.portId !== "") {
            writer.uint32(50).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(58).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseIdentifiedChannel);
        message.connectionHops = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                case 2:
                    message.ordering = reader.int32();
                    break;
                case 3:
                    message.counterparty = exports.Counterparty.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.connectionHops.push(reader.string());
                    break;
                case 5:
                    message.version = reader.string();
                    break;
                case 6:
                    message.portId = reader.string();
                    break;
                case 7:
                    message.channelId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseIdentifiedChannel);
        message.connectionHops = [];
        if (object.state !== undefined && object.state !== null) {
            message.state = stateFromJSON(object.state);
        }
        else {
            message.state = 0;
        }
        if (object.ordering !== undefined && object.ordering !== null) {
            message.ordering = orderFromJSON(object.ordering);
        }
        else {
            message.ordering = 0;
        }
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromJSON(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        if (object.connectionHops !== undefined && object.connectionHops !== null) {
            for (const e of object.connectionHops) {
                message.connectionHops.push(String(e));
            }
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = String(object.version);
        }
        else {
            message.version = "";
        }
        if (object.portId !== undefined && object.portId !== null) {
            message.portId = String(object.portId);
        }
        else {
            message.portId = "";
        }
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.state !== undefined && (obj.state = stateToJSON(message.state));
        message.ordering !== undefined && (obj.ordering = orderToJSON(message.ordering));
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty ? exports.Counterparty.toJSON(message.counterparty) : undefined);
        if (message.connectionHops) {
            obj.connectionHops = message.connectionHops.map((e) => e);
        }
        else {
            obj.connectionHops = [];
        }
        message.version !== undefined && (obj.version = message.version);
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = Object.assign({}, baseIdentifiedChannel);
        message.state = (_a = object.state) !== null && _a !== void 0 ? _a : 0;
        message.ordering = (_b = object.ordering) !== null && _b !== void 0 ? _b : 0;
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromPartial(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        message.connectionHops = [];
        if (object.connectionHops !== undefined && object.connectionHops !== null) {
            for (const e of object.connectionHops) {
                message.connectionHops.push(e);
            }
        }
        message.version = (_c = object.version) !== null && _c !== void 0 ? _c : "";
        message.portId = (_d = object.portId) !== null && _d !== void 0 ? _d : "";
        message.channelId = (_e = object.channelId) !== null && _e !== void 0 ? _e : "";
        return message;
    },
};
const baseCounterparty = { portId: "", channelId: "" };
exports.Counterparty = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCounterparty);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCounterparty);
        if (object.portId !== undefined && object.portId !== null) {
            message.portId = String(object.portId);
        }
        else {
            message.portId = "";
        }
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseCounterparty);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const basePacket = {
    sequence: long_1.default.UZERO,
    sourcePort: "",
    sourceChannel: "",
    destinationPort: "",
    destinationChannel: "",
    timeoutTimestamp: long_1.default.UZERO,
};
exports.Packet = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.sequence.isZero()) {
            writer.uint32(8).uint64(message.sequence);
        }
        if (message.sourcePort !== "") {
            writer.uint32(18).string(message.sourcePort);
        }
        if (message.sourceChannel !== "") {
            writer.uint32(26).string(message.sourceChannel);
        }
        if (message.destinationPort !== "") {
            writer.uint32(34).string(message.destinationPort);
        }
        if (message.destinationChannel !== "") {
            writer.uint32(42).string(message.destinationChannel);
        }
        if (message.data.length !== 0) {
            writer.uint32(50).bytes(message.data);
        }
        if (message.timeoutHeight !== undefined) {
            client_1.Height.encode(message.timeoutHeight, writer.uint32(58).fork()).ldelim();
        }
        if (!message.timeoutTimestamp.isZero()) {
            writer.uint32(64).uint64(message.timeoutTimestamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, basePacket);
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sequence = reader.uint64();
                    break;
                case 2:
                    message.sourcePort = reader.string();
                    break;
                case 3:
                    message.sourceChannel = reader.string();
                    break;
                case 4:
                    message.destinationPort = reader.string();
                    break;
                case 5:
                    message.destinationChannel = reader.string();
                    break;
                case 6:
                    message.data = reader.bytes();
                    break;
                case 7:
                    message.timeoutHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.timeoutTimestamp = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, basePacket);
        message.data = new Uint8Array();
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = long_1.default.fromString(object.sequence);
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        if (object.sourcePort !== undefined && object.sourcePort !== null) {
            message.sourcePort = String(object.sourcePort);
        }
        else {
            message.sourcePort = "";
        }
        if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
            message.sourceChannel = String(object.sourceChannel);
        }
        else {
            message.sourceChannel = "";
        }
        if (object.destinationPort !== undefined && object.destinationPort !== null) {
            message.destinationPort = String(object.destinationPort);
        }
        else {
            message.destinationPort = "";
        }
        if (object.destinationChannel !== undefined && object.destinationChannel !== null) {
            message.destinationChannel = String(object.destinationChannel);
        }
        else {
            message.destinationChannel = "";
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = client_1.Height.fromJSON(object.timeoutHeight);
        }
        else {
            message.timeoutHeight = undefined;
        }
        if (object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null) {
            message.timeoutTimestamp = long_1.default.fromString(object.timeoutTimestamp);
        }
        else {
            message.timeoutTimestamp = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sequence !== undefined && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        message.sourcePort !== undefined && (obj.sourcePort = message.sourcePort);
        message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
        message.destinationPort !== undefined && (obj.destinationPort = message.destinationPort);
        message.destinationChannel !== undefined && (obj.destinationChannel = message.destinationChannel);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.timeoutHeight !== undefined &&
            (obj.timeoutHeight = message.timeoutHeight ? client_1.Height.toJSON(message.timeoutHeight) : undefined);
        message.timeoutTimestamp !== undefined &&
            (obj.timeoutTimestamp = (message.timeoutTimestamp || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = Object.assign({}, basePacket);
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        message.sourcePort = (_a = object.sourcePort) !== null && _a !== void 0 ? _a : "";
        message.sourceChannel = (_b = object.sourceChannel) !== null && _b !== void 0 ? _b : "";
        message.destinationPort = (_c = object.destinationPort) !== null && _c !== void 0 ? _c : "";
        message.destinationChannel = (_d = object.destinationChannel) !== null && _d !== void 0 ? _d : "";
        message.data = (_e = object.data) !== null && _e !== void 0 ? _e : new Uint8Array();
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = client_1.Height.fromPartial(object.timeoutHeight);
        }
        else {
            message.timeoutHeight = undefined;
        }
        if (object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null) {
            message.timeoutTimestamp = object.timeoutTimestamp;
        }
        else {
            message.timeoutTimestamp = long_1.default.UZERO;
        }
        return message;
    },
};
const basePacketState = { portId: "", channelId: "", sequence: long_1.default.UZERO };
exports.PacketState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(24).uint64(message.sequence);
        }
        if (message.data.length !== 0) {
            writer.uint32(34).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, basePacketState);
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                case 3:
                    message.sequence = reader.uint64();
                    break;
                case 4:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, basePacketState);
        message.data = new Uint8Array();
        if (object.portId !== undefined && object.portId !== null) {
            message.portId = String(object.portId);
        }
        else {
            message.portId = "";
        }
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = "";
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = long_1.default.fromString(object.sequence);
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.sequence !== undefined && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, basePacketState);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        message.data = (_c = object.data) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
const baseAcknowledgement = {};
exports.Acknowledgement = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== undefined) {
            writer.uint32(170).bytes(message.result);
        }
        if (message.error !== undefined) {
            writer.uint32(178).string(message.error);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseAcknowledgement);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 21:
                    message.result = reader.bytes();
                    break;
                case 22:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseAcknowledgement);
        if (object.result !== undefined && object.result !== null) {
            message.result = bytesFromBase64(object.result);
        }
        if (object.error !== undefined && object.error !== null) {
            message.error = String(object.error);
        }
        else {
            message.error = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined &&
            (obj.result = message.result !== undefined ? base64FromBytes(message.result) : undefined);
        message.error !== undefined && (obj.error = message.error);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseAcknowledgement);
        message.result = (_a = object.result) !== null && _a !== void 0 ? _a : undefined;
        message.error = (_b = object.error) !== null && _b !== void 0 ? _b : undefined;
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (const byte of arr) {
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=channel.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fraction = exports.Header = exports.Misbehaviour = exports.ConsensusState = exports.ClientState = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const duration_1 = require("../../../../google/protobuf/duration");
const client_1 = require("../../../../ibc/core/client/v1/client");
const commitment_1 = require("../../../../ibc/core/commitment/v1/commitment");
const types_1 = require("../../../../tendermint/types/types");
const validator_1 = require("../../../../tendermint/types/validator");
const timestamp_1 = require("../../../../google/protobuf/timestamp");
const proofs_1 = require("../../../../confio/proofs");
exports.protobufPackage = "ibc.lightclients.tendermint.v1";
const baseClientState = {
    chainId: "",
    upgradePath: "",
    allowUpdateAfterExpiry: false,
    allowUpdateAfterMisbehaviour: false,
};
exports.ClientState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.chainId !== "") {
            writer.uint32(10).string(message.chainId);
        }
        if (message.trustLevel !== undefined) {
            exports.Fraction.encode(message.trustLevel, writer.uint32(18).fork()).ldelim();
        }
        if (message.trustingPeriod !== undefined) {
            duration_1.Duration.encode(message.trustingPeriod, writer.uint32(26).fork()).ldelim();
        }
        if (message.unbondingPeriod !== undefined) {
            duration_1.Duration.encode(message.unbondingPeriod, writer.uint32(34).fork()).ldelim();
        }
        if (message.maxClockDrift !== undefined) {
            duration_1.Duration.encode(message.maxClockDrift, writer.uint32(42).fork()).ldelim();
        }
        if (message.frozenHeight !== undefined) {
            client_1.Height.encode(message.frozenHeight, writer.uint32(50).fork()).ldelim();
        }
        if (message.latestHeight !== undefined) {
            client_1.Height.encode(message.latestHeight, writer.uint32(58).fork()).ldelim();
        }
        for (const v of message.proofSpecs) {
            proofs_1.ProofSpec.encode(v, writer.uint32(66).fork()).ldelim();
        }
        for (const v of message.upgradePath) {
            writer.uint32(74).string(v);
        }
        if (message.allowUpdateAfterExpiry === true) {
            writer.uint32(80).bool(message.allowUpdateAfterExpiry);
        }
        if (message.allowUpdateAfterMisbehaviour === true) {
            writer.uint32(88).bool(message.allowUpdateAfterMisbehaviour);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseClientState);
        message.proofSpecs = [];
        message.upgradePath = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainId = reader.string();
                    break;
                case 2:
                    message.trustLevel = exports.Fraction.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.trustingPeriod = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.unbondingPeriod = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.maxClockDrift = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.frozenHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.latestHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.proofSpecs.push(proofs_1.ProofSpec.decode(reader, reader.uint32()));
                    break;
                case 9:
                    message.upgradePath.push(reader.string());
                    break;
                case 10:
                    message.allowUpdateAfterExpiry = reader.bool();
                    break;
                case 11:
                    message.allowUpdateAfterMisbehaviour = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseClientState);
        message.proofSpecs = [];
        message.upgradePath = [];
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = String(object.chainId);
        }
        else {
            message.chainId = "";
        }
        if (object.trustLevel !== undefined && object.trustLevel !== null) {
            message.trustLevel = exports.Fraction.fromJSON(object.trustLevel);
        }
        else {
            message.trustLevel = undefined;
        }
        if (object.trustingPeriod !== undefined && object.trustingPeriod !== null) {
            message.trustingPeriod = duration_1.Duration.fromJSON(object.trustingPeriod);
        }
        else {
            message.trustingPeriod = undefined;
        }
        if (object.unbondingPeriod !== undefined && object.unbondingPeriod !== null) {
            message.unbondingPeriod = duration_1.Duration.fromJSON(object.unbondingPeriod);
        }
        else {
            message.unbondingPeriod = undefined;
        }
        if (object.maxClockDrift !== undefined && object.maxClockDrift !== null) {
            message.maxClockDrift = duration_1.Duration.fromJSON(object.maxClockDrift);
        }
        else {
            message.maxClockDrift = undefined;
        }
        if (object.frozenHeight !== undefined && object.frozenHeight !== null) {
            message.frozenHeight = client_1.Height.fromJSON(object.frozenHeight);
        }
        else {
            message.frozenHeight = undefined;
        }
        if (object.latestHeight !== undefined && object.latestHeight !== null) {
            message.latestHeight = client_1.Height.fromJSON(object.latestHeight);
        }
        else {
            message.latestHeight = undefined;
        }
        if (object.proofSpecs !== undefined && object.proofSpecs !== null) {
            for (const e of object.proofSpecs) {
                message.proofSpecs.push(proofs_1.ProofSpec.fromJSON(e));
            }
        }
        if (object.upgradePath !== undefined && object.upgradePath !== null) {
            for (const e of object.upgradePath) {
                message.upgradePath.push(String(e));
            }
        }
        if (object.allowUpdateAfterExpiry !== undefined && object.allowUpdateAfterExpiry !== null) {
            message.allowUpdateAfterExpiry = Boolean(object.allowUpdateAfterExpiry);
        }
        else {
            message.allowUpdateAfterExpiry = false;
        }
        if (object.allowUpdateAfterMisbehaviour !== undefined && object.allowUpdateAfterMisbehaviour !== null) {
            message.allowUpdateAfterMisbehaviour = Boolean(object.allowUpdateAfterMisbehaviour);
        }
        else {
            message.allowUpdateAfterMisbehaviour = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.trustLevel !== undefined &&
            (obj.trustLevel = message.trustLevel ? exports.Fraction.toJSON(message.trustLevel) : undefined);
        message.trustingPeriod !== undefined &&
            (obj.trustingPeriod = message.trustingPeriod ? duration_1.Duration.toJSON(message.trustingPeriod) : undefined);
        message.unbondingPeriod !== undefined &&
            (obj.unbondingPeriod = message.unbondingPeriod ? duration_1.Duration.toJSON(message.unbondingPeriod) : undefined);
        message.maxClockDrift !== undefined &&
            (obj.maxClockDrift = message.maxClockDrift ? duration_1.Duration.toJSON(message.maxClockDrift) : undefined);
        message.frozenHeight !== undefined &&
            (obj.frozenHeight = message.frozenHeight ? client_1.Height.toJSON(message.frozenHeight) : undefined);
        message.latestHeight !== undefined &&
            (obj.latestHeight = message.latestHeight ? client_1.Height.toJSON(message.latestHeight) : undefined);
        if (message.proofSpecs) {
            obj.proofSpecs = message.proofSpecs.map((e) => (e ? proofs_1.ProofSpec.toJSON(e) : undefined));
        }
        else {
            obj.proofSpecs = [];
        }
        if (message.upgradePath) {
            obj.upgradePath = message.upgradePath.map((e) => e);
        }
        else {
            obj.upgradePath = [];
        }
        message.allowUpdateAfterExpiry !== undefined &&
            (obj.allowUpdateAfterExpiry = message.allowUpdateAfterExpiry);
        message.allowUpdateAfterMisbehaviour !== undefined &&
            (obj.allowUpdateAfterMisbehaviour = message.allowUpdateAfterMisbehaviour);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseClientState);
        message.chainId = (_a = object.chainId) !== null && _a !== void 0 ? _a : "";
        if (object.trustLevel !== undefined && object.trustLevel !== null) {
            message.trustLevel = exports.Fraction.fromPartial(object.trustLevel);
        }
        else {
            message.trustLevel = undefined;
        }
        if (object.trustingPeriod !== undefined && object.trustingPeriod !== null) {
            message.trustingPeriod = duration_1.Duration.fromPartial(object.trustingPeriod);
        }
        else {
            message.trustingPeriod = undefined;
        }
        if (object.unbondingPeriod !== undefined && object.unbondingPeriod !== null) {
            message.unbondingPeriod = duration_1.Duration.fromPartial(object.unbondingPeriod);
        }
        else {
            message.unbondingPeriod = undefined;
        }
        if (object.maxClockDrift !== undefined && object.maxClockDrift !== null) {
            message.maxClockDrift = duration_1.Duration.fromPartial(object.maxClockDrift);
        }
        else {
            message.maxClockDrift = undefined;
        }
        if (object.frozenHeight !== undefined && object.frozenHeight !== null) {
            message.frozenHeight = client_1.Height.fromPartial(object.frozenHeight);
        }
        else {
            message.frozenHeight = undefined;
        }
        if (object.latestHeight !== undefined && object.latestHeight !== null) {
            message.latestHeight = client_1.Height.fromPartial(object.latestHeight);
        }
        else {
            message.latestHeight = undefined;
        }
        message.proofSpecs = [];
        if (object.proofSpecs !== undefined && object.proofSpecs !== null) {
            for (const e of object.proofSpecs) {
                message.proofSpecs.push(proofs_1.ProofSpec.fromPartial(e));
            }
        }
        message.upgradePath = [];
        if (object.upgradePath !== undefined && object.upgradePath !== null) {
            for (const e of object.upgradePath) {
                message.upgradePath.push(e);
            }
        }
        message.allowUpdateAfterExpiry = (_b = object.allowUpdateAfterExpiry) !== null && _b !== void 0 ? _b : false;
        message.allowUpdateAfterMisbehaviour = (_c = object.allowUpdateAfterMisbehaviour) !== null && _c !== void 0 ? _c : false;
        return message;
    },
};
const baseConsensusState = {};
exports.ConsensusState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.timestamp !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
        }
        if (message.root !== undefined) {
            commitment_1.MerkleRoot.encode(message.root, writer.uint32(18).fork()).ldelim();
        }
        if (message.nextValidatorsHash.length !== 0) {
            writer.uint32(26).bytes(message.nextValidatorsHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseConsensusState);
        message.nextValidatorsHash = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.timestamp = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.root = commitment_1.MerkleRoot.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.nextValidatorsHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseConsensusState);
        message.nextValidatorsHash = new Uint8Array();
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = fromJsonTimestamp(object.timestamp);
        }
        else {
            message.timestamp = undefined;
        }
        if (object.root !== undefined && object.root !== null) {
            message.root = commitment_1.MerkleRoot.fromJSON(object.root);
        }
        else {
            message.root = undefined;
        }
        if (object.nextValidatorsHash !== undefined && object.nextValidatorsHash !== null) {
            message.nextValidatorsHash = bytesFromBase64(object.nextValidatorsHash);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
        message.root !== undefined && (obj.root = message.root ? commitment_1.MerkleRoot.toJSON(message.root) : undefined);
        message.nextValidatorsHash !== undefined &&
            (obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash !== undefined ? message.nextValidatorsHash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseConsensusState);
        message.timestamp = (_a = object.timestamp) !== null && _a !== void 0 ? _a : undefined;
        if (object.root !== undefined && object.root !== null) {
            message.root = commitment_1.MerkleRoot.fromPartial(object.root);
        }
        else {
            message.root = undefined;
        }
        message.nextValidatorsHash = (_b = object.nextValidatorsHash) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
const baseMisbehaviour = { clientId: "" };
exports.Misbehaviour = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.header1 !== undefined) {
            exports.Header.encode(message.header1, writer.uint32(18).fork()).ldelim();
        }
        if (message.header2 !== undefined) {
            exports.Header.encode(message.header2, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMisbehaviour);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.header1 = exports.Header.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.header2 = exports.Header.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMisbehaviour);
        if (object.clientId !== undefined && object.clientId !== null) {
            message.clientId = String(object.clientId);
        }
        else {
            message.clientId = "";
        }
        if (object.header1 !== undefined && object.header1 !== null) {
            message.header1 = exports.Header.fromJSON(object.header1);
        }
        else {
            message.header1 = undefined;
        }
        if (object.header2 !== undefined && object.header2 !== null) {
            message.header2 = exports.Header.fromJSON(object.header2);
        }
        else {
            message.header2 = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.header1 !== undefined &&
            (obj.header1 = message.header1 ? exports.Header.toJSON(message.header1) : undefined);
        message.header2 !== undefined &&
            (obj.header2 = message.header2 ? exports.Header.toJSON(message.header2) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseMisbehaviour);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        if (object.header1 !== undefined && object.header1 !== null) {
            message.header1 = exports.Header.fromPartial(object.header1);
        }
        else {
            message.header1 = undefined;
        }
        if (object.header2 !== undefined && object.header2 !== null) {
            message.header2 = exports.Header.fromPartial(object.header2);
        }
        else {
            message.header2 = undefined;
        }
        return message;
    },
};
const baseHeader = {};
exports.Header = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.signedHeader !== undefined) {
            types_1.SignedHeader.encode(message.signedHeader, writer.uint32(10).fork()).ldelim();
        }
        if (message.validatorSet !== undefined) {
            validator_1.ValidatorSet.encode(message.validatorSet, writer.uint32(18).fork()).ldelim();
        }
        if (message.trustedHeight !== undefined) {
            client_1.Height.encode(message.trustedHeight, writer.uint32(26).fork()).ldelim();
        }
        if (message.trustedValidators !== undefined) {
            validator_1.ValidatorSet.encode(message.trustedValidators, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseHeader);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signedHeader = types_1.SignedHeader.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validatorSet = validator_1.ValidatorSet.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.trustedHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.trustedValidators = validator_1.ValidatorSet.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseHeader);
        if (object.signedHeader !== undefined && object.signedHeader !== null) {
            message.signedHeader = types_1.SignedHeader.fromJSON(object.signedHeader);
        }
        else {
            message.signedHeader = undefined;
        }
        if (object.validatorSet !== undefined && object.validatorSet !== null) {
            message.validatorSet = validator_1.ValidatorSet.fromJSON(object.validatorSet);
        }
        else {
            message.validatorSet = undefined;
        }
        if (object.trustedHeight !== undefined && object.trustedHeight !== null) {
            message.trustedHeight = client_1.Height.fromJSON(object.trustedHeight);
        }
        else {
            message.trustedHeight = undefined;
        }
        if (object.trustedValidators !== undefined && object.trustedValidators !== null) {
            message.trustedValidators = validator_1.ValidatorSet.fromJSON(object.trustedValidators);
        }
        else {
            message.trustedValidators = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.signedHeader !== undefined &&
            (obj.signedHeader = message.signedHeader ? types_1.SignedHeader.toJSON(message.signedHeader) : undefined);
        message.validatorSet !== undefined &&
            (obj.validatorSet = message.validatorSet ? validator_1.ValidatorSet.toJSON(message.validatorSet) : undefined);
        message.trustedHeight !== undefined &&
            (obj.trustedHeight = message.trustedHeight ? client_1.Height.toJSON(message.trustedHeight) : undefined);
        message.trustedValidators !== undefined &&
            (obj.trustedValidators = message.trustedValidators
                ? validator_1.ValidatorSet.toJSON(message.trustedValidators)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseHeader);
        if (object.signedHeader !== undefined && object.signedHeader !== null) {
            message.signedHeader = types_1.SignedHeader.fromPartial(object.signedHeader);
        }
        else {
            message.signedHeader = undefined;
        }
        if (object.validatorSet !== undefined && object.validatorSet !== null) {
            message.validatorSet = validator_1.ValidatorSet.fromPartial(object.validatorSet);
        }
        else {
            message.validatorSet = undefined;
        }
        if (object.trustedHeight !== undefined && object.trustedHeight !== null) {
            message.trustedHeight = client_1.Height.fromPartial(object.trustedHeight);
        }
        else {
            message.trustedHeight = undefined;
        }
        if (object.trustedValidators !== undefined && object.trustedValidators !== null) {
            message.trustedValidators = validator_1.ValidatorSet.fromPartial(object.trustedValidators);
        }
        else {
            message.trustedValidators = undefined;
        }
        return message;
    },
};
const baseFraction = { numerator: long_1.default.UZERO, denominator: long_1.default.UZERO };
exports.Fraction = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.numerator.isZero()) {
            writer.uint32(8).uint64(message.numerator);
        }
        if (!message.denominator.isZero()) {
            writer.uint32(16).uint64(message.denominator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseFraction);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.numerator = reader.uint64();
                    break;
                case 2:
                    message.denominator = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseFraction);
        if (object.numerator !== undefined && object.numerator !== null) {
            message.numerator = long_1.default.fromString(object.numerator);
        }
        else {
            message.numerator = long_1.default.UZERO;
        }
        if (object.denominator !== undefined && object.denominator !== null) {
            message.denominator = long_1.default.fromString(object.denominator);
        }
        else {
            message.denominator = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.numerator !== undefined && (obj.numerator = (message.numerator || long_1.default.UZERO).toString());
        message.denominator !== undefined && (obj.denominator = (message.denominator || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseFraction);
        if (object.numerator !== undefined && object.numerator !== null) {
            message.numerator = object.numerator;
        }
        else {
            message.numerator = long_1.default.UZERO;
        }
        if (object.denominator !== undefined && object.denominator !== null) {
            message.denominator = object.denominator;
        }
        else {
            message.denominator = long_1.default.UZERO;
        }
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
function toTimestamp(date) {
    const seconds = numberToLong(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds.toNumber() * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
    }
}
function numberToLong(number) {
    return long_1.default.fromNumber(number);
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tendermint.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressedNonExistenceProof = exports.CompressedExistenceProof = exports.CompressedBatchEntry = exports.CompressedBatchProof = exports.BatchEntry = exports.BatchProof = exports.InnerSpec = exports.ProofSpec = exports.InnerOp = exports.LeafOp = exports.CommitmentProof = exports.NonExistenceProof = exports.ExistenceProof = exports.lengthOpToJSON = exports.lengthOpFromJSON = exports.LengthOp = exports.hashOpToJSON = exports.hashOpFromJSON = exports.HashOp = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "ics23";
var HashOp;
(function (HashOp) {
    /** NO_HASH - NO_HASH is the default if no data passed. Note this is an illegal argument some places. */
    HashOp[HashOp["NO_HASH"] = 0] = "NO_HASH";
    HashOp[HashOp["SHA256"] = 1] = "SHA256";
    HashOp[HashOp["SHA512"] = 2] = "SHA512";
    HashOp[HashOp["KECCAK"] = 3] = "KECCAK";
    HashOp[HashOp["RIPEMD160"] = 4] = "RIPEMD160";
    /** BITCOIN - ripemd160(sha256(x)) */
    HashOp[HashOp["BITCOIN"] = 5] = "BITCOIN";
    HashOp[HashOp["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(HashOp = exports.HashOp || (exports.HashOp = {}));
function hashOpFromJSON(object) {
    switch (object) {
        case 0:
        case "NO_HASH":
            return HashOp.NO_HASH;
        case 1:
        case "SHA256":
            return HashOp.SHA256;
        case 2:
        case "SHA512":
            return HashOp.SHA512;
        case 3:
        case "KECCAK":
            return HashOp.KECCAK;
        case 4:
        case "RIPEMD160":
            return HashOp.RIPEMD160;
        case 5:
        case "BITCOIN":
            return HashOp.BITCOIN;
        case -1:
        case "UNRECOGNIZED":
        default:
            return HashOp.UNRECOGNIZED;
    }
}
exports.hashOpFromJSON = hashOpFromJSON;
function hashOpToJSON(object) {
    switch (object) {
        case HashOp.NO_HASH:
            return "NO_HASH";
        case HashOp.SHA256:
            return "SHA256";
        case HashOp.SHA512:
            return "SHA512";
        case HashOp.KECCAK:
            return "KECCAK";
        case HashOp.RIPEMD160:
            return "RIPEMD160";
        case HashOp.BITCOIN:
            return "BITCOIN";
        default:
            return "UNKNOWN";
    }
}
exports.hashOpToJSON = hashOpToJSON;
/**
 * LengthOp defines how to process the key and value of the LeafOp
 * to include length information. After encoding the length with the given
 * algorithm, the length will be prepended to the key and value bytes.
 * (Each one with it's own encoded length)
 */
var LengthOp;
(function (LengthOp) {
    /** NO_PREFIX - NO_PREFIX don't include any length info */
    LengthOp[LengthOp["NO_PREFIX"] = 0] = "NO_PREFIX";
    /** VAR_PROTO - VAR_PROTO uses protobuf (and go-amino) varint encoding of the length */
    LengthOp[LengthOp["VAR_PROTO"] = 1] = "VAR_PROTO";
    /** VAR_RLP - VAR_RLP uses rlp int encoding of the length */
    LengthOp[LengthOp["VAR_RLP"] = 2] = "VAR_RLP";
    /** FIXED32_BIG - FIXED32_BIG uses big-endian encoding of the length as a 32 bit integer */
    LengthOp[LengthOp["FIXED32_BIG"] = 3] = "FIXED32_BIG";
    /** FIXED32_LITTLE - FIXED32_LITTLE uses little-endian encoding of the length as a 32 bit integer */
    LengthOp[LengthOp["FIXED32_LITTLE"] = 4] = "FIXED32_LITTLE";
    /** FIXED64_BIG - FIXED64_BIG uses big-endian encoding of the length as a 64 bit integer */
    LengthOp[LengthOp["FIXED64_BIG"] = 5] = "FIXED64_BIG";
    /** FIXED64_LITTLE - FIXED64_LITTLE uses little-endian encoding of the length as a 64 bit integer */
    LengthOp[LengthOp["FIXED64_LITTLE"] = 6] = "FIXED64_LITTLE";
    /** REQUIRE_32_BYTES - REQUIRE_32_BYTES is like NONE, but will fail if the input is not exactly 32 bytes (sha256 output) */
    LengthOp[LengthOp["REQUIRE_32_BYTES"] = 7] = "REQUIRE_32_BYTES";
    /** REQUIRE_64_BYTES - REQUIRE_64_BYTES is like NONE, but will fail if the input is not exactly 64 bytes (sha512 output) */
    LengthOp[LengthOp["REQUIRE_64_BYTES"] = 8] = "REQUIRE_64_BYTES";
    LengthOp[LengthOp["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(LengthOp = exports.LengthOp || (exports.LengthOp = {}));
function lengthOpFromJSON(object) {
    switch (object) {
        case 0:
        case "NO_PREFIX":
            return LengthOp.NO_PREFIX;
        case 1:
        case "VAR_PROTO":
            return LengthOp.VAR_PROTO;
        case 2:
        case "VAR_RLP":
            return LengthOp.VAR_RLP;
        case 3:
        case "FIXED32_BIG":
            return LengthOp.FIXED32_BIG;
        case 4:
        case "FIXED32_LITTLE":
            return LengthOp.FIXED32_LITTLE;
        case 5:
        case "FIXED64_BIG":
            return LengthOp.FIXED64_BIG;
        case 6:
        case "FIXED64_LITTLE":
            return LengthOp.FIXED64_LITTLE;
        case 7:
        case "REQUIRE_32_BYTES":
            return LengthOp.REQUIRE_32_BYTES;
        case 8:
        case "REQUIRE_64_BYTES":
            return LengthOp.REQUIRE_64_BYTES;
        case -1:
        case "UNRECOGNIZED":
        default:
            return LengthOp.UNRECOGNIZED;
    }
}
exports.lengthOpFromJSON = lengthOpFromJSON;
function lengthOpToJSON(object) {
    switch (object) {
        case LengthOp.NO_PREFIX:
            return "NO_PREFIX";
        case LengthOp.VAR_PROTO:
            return "VAR_PROTO";
        case LengthOp.VAR_RLP:
            return "VAR_RLP";
        case LengthOp.FIXED32_BIG:
            return "FIXED32_BIG";
        case LengthOp.FIXED32_LITTLE:
            return "FIXED32_LITTLE";
        case LengthOp.FIXED64_BIG:
            return "FIXED64_BIG";
        case LengthOp.FIXED64_LITTLE:
            return "FIXED64_LITTLE";
        case LengthOp.REQUIRE_32_BYTES:
            return "REQUIRE_32_BYTES";
        case LengthOp.REQUIRE_64_BYTES:
            return "REQUIRE_64_BYTES";
        default:
            return "UNKNOWN";
    }
}
exports.lengthOpToJSON = lengthOpToJSON;
const baseExistenceProof = {};
exports.ExistenceProof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        if (message.leaf !== undefined) {
            exports.LeafOp.encode(message.leaf, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.path) {
            exports.InnerOp.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseExistenceProof);
        message.path = [];
        message.key = new Uint8Array();
        message.value = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                case 3:
                    message.leaf = exports.LeafOp.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.path.push(exports.InnerOp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseExistenceProof);
        message.path = [];
        message.key = new Uint8Array();
        message.value = new Uint8Array();
        if (object.key !== undefined && object.key !== null) {
            message.key = bytesFromBase64(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        if (object.leaf !== undefined && object.leaf !== null) {
            message.leaf = exports.LeafOp.fromJSON(object.leaf);
        }
        else {
            message.leaf = undefined;
        }
        if (object.path !== undefined && object.path !== null) {
            for (const e of object.path) {
                message.path.push(exports.InnerOp.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined &&
            (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.leaf !== undefined && (obj.leaf = message.leaf ? exports.LeafOp.toJSON(message.leaf) : undefined);
        if (message.path) {
            obj.path = message.path.map((e) => (e ? exports.InnerOp.toJSON(e) : undefined));
        }
        else {
            obj.path = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseExistenceProof);
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array();
        if (object.leaf !== undefined && object.leaf !== null) {
            message.leaf = exports.LeafOp.fromPartial(object.leaf);
        }
        else {
            message.leaf = undefined;
        }
        message.path = [];
        if (object.path !== undefined && object.path !== null) {
            for (const e of object.path) {
                message.path.push(exports.InnerOp.fromPartial(e));
            }
        }
        return message;
    },
};
const baseNonExistenceProof = {};
exports.NonExistenceProof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.left !== undefined) {
            exports.ExistenceProof.encode(message.left, writer.uint32(18).fork()).ldelim();
        }
        if (message.right !== undefined) {
            exports.ExistenceProof.encode(message.right, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseNonExistenceProof);
        message.key = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.left = exports.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.right = exports.ExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseNonExistenceProof);
        message.key = new Uint8Array();
        if (object.key !== undefined && object.key !== null) {
            message.key = bytesFromBase64(object.key);
        }
        if (object.left !== undefined && object.left !== null) {
            message.left = exports.ExistenceProof.fromJSON(object.left);
        }
        else {
            message.left = undefined;
        }
        if (object.right !== undefined && object.right !== null) {
            message.right = exports.ExistenceProof.fromJSON(object.right);
        }
        else {
            message.right = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined &&
            (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
        message.left !== undefined && (obj.left = message.left ? exports.ExistenceProof.toJSON(message.left) : undefined);
        message.right !== undefined &&
            (obj.right = message.right ? exports.ExistenceProof.toJSON(message.right) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseNonExistenceProof);
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
        if (object.left !== undefined && object.left !== null) {
            message.left = exports.ExistenceProof.fromPartial(object.left);
        }
        else {
            message.left = undefined;
        }
        if (object.right !== undefined && object.right !== null) {
            message.right = exports.ExistenceProof.fromPartial(object.right);
        }
        else {
            message.right = undefined;
        }
        return message;
    },
};
const baseCommitmentProof = {};
exports.CommitmentProof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.exist !== undefined) {
            exports.ExistenceProof.encode(message.exist, writer.uint32(10).fork()).ldelim();
        }
        if (message.nonexist !== undefined) {
            exports.NonExistenceProof.encode(message.nonexist, writer.uint32(18).fork()).ldelim();
        }
        if (message.batch !== undefined) {
            exports.BatchProof.encode(message.batch, writer.uint32(26).fork()).ldelim();
        }
        if (message.compressed !== undefined) {
            exports.CompressedBatchProof.encode(message.compressed, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCommitmentProof);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.exist = exports.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nonexist = exports.NonExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.batch = exports.BatchProof.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.compressed = exports.CompressedBatchProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCommitmentProof);
        if (object.exist !== undefined && object.exist !== null) {
            message.exist = exports.ExistenceProof.fromJSON(object.exist);
        }
        else {
            message.exist = undefined;
        }
        if (object.nonexist !== undefined && object.nonexist !== null) {
            message.nonexist = exports.NonExistenceProof.fromJSON(object.nonexist);
        }
        else {
            message.nonexist = undefined;
        }
        if (object.batch !== undefined && object.batch !== null) {
            message.batch = exports.BatchProof.fromJSON(object.batch);
        }
        else {
            message.batch = undefined;
        }
        if (object.compressed !== undefined && object.compressed !== null) {
            message.compressed = exports.CompressedBatchProof.fromJSON(object.compressed);
        }
        else {
            message.compressed = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.exist !== undefined &&
            (obj.exist = message.exist ? exports.ExistenceProof.toJSON(message.exist) : undefined);
        message.nonexist !== undefined &&
            (obj.nonexist = message.nonexist ? exports.NonExistenceProof.toJSON(message.nonexist) : undefined);
        message.batch !== undefined && (obj.batch = message.batch ? exports.BatchProof.toJSON(message.batch) : undefined);
        message.compressed !== undefined &&
            (obj.compressed = message.compressed ? exports.CompressedBatchProof.toJSON(message.compressed) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseCommitmentProof);
        if (object.exist !== undefined && object.exist !== null) {
            message.exist = exports.ExistenceProof.fromPartial(object.exist);
        }
        else {
            message.exist = undefined;
        }
        if (object.nonexist !== undefined && object.nonexist !== null) {
            message.nonexist = exports.NonExistenceProof.fromPartial(object.nonexist);
        }
        else {
            message.nonexist = undefined;
        }
        if (object.batch !== undefined && object.batch !== null) {
            message.batch = exports.BatchProof.fromPartial(object.batch);
        }
        else {
            message.batch = undefined;
        }
        if (object.compressed !== undefined && object.compressed !== null) {
            message.compressed = exports.CompressedBatchProof.fromPartial(object.compressed);
        }
        else {
            message.compressed = undefined;
        }
        return message;
    },
};
const baseLeafOp = { hash: 0, prehashKey: 0, prehashValue: 0, length: 0 };
exports.LeafOp = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.hash !== 0) {
            writer.uint32(8).int32(message.hash);
        }
        if (message.prehashKey !== 0) {
            writer.uint32(16).int32(message.prehashKey);
        }
        if (message.prehashValue !== 0) {
            writer.uint32(24).int32(message.prehashValue);
        }
        if (message.length !== 0) {
            writer.uint32(32).int32(message.length);
        }
        if (message.prefix.length !== 0) {
            writer.uint32(42).bytes(message.prefix);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseLeafOp);
        message.prefix = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.int32();
                    break;
                case 2:
                    message.prehashKey = reader.int32();
                    break;
                case 3:
                    message.prehashValue = reader.int32();
                    break;
                case 4:
                    message.length = reader.int32();
                    break;
                case 5:
                    message.prefix = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseLeafOp);
        message.prefix = new Uint8Array();
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = hashOpFromJSON(object.hash);
        }
        else {
            message.hash = 0;
        }
        if (object.prehashKey !== undefined && object.prehashKey !== null) {
            message.prehashKey = hashOpFromJSON(object.prehashKey);
        }
        else {
            message.prehashKey = 0;
        }
        if (object.prehashValue !== undefined && object.prehashValue !== null) {
            message.prehashValue = hashOpFromJSON(object.prehashValue);
        }
        else {
            message.prehashValue = 0;
        }
        if (object.length !== undefined && object.length !== null) {
            message.length = lengthOpFromJSON(object.length);
        }
        else {
            message.length = 0;
        }
        if (object.prefix !== undefined && object.prefix !== null) {
            message.prefix = bytesFromBase64(object.prefix);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = hashOpToJSON(message.hash));
        message.prehashKey !== undefined && (obj.prehashKey = hashOpToJSON(message.prehashKey));
        message.prehashValue !== undefined && (obj.prehashValue = hashOpToJSON(message.prehashValue));
        message.length !== undefined && (obj.length = lengthOpToJSON(message.length));
        message.prefix !== undefined &&
            (obj.prefix = base64FromBytes(message.prefix !== undefined ? message.prefix : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = Object.assign({}, baseLeafOp);
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : 0;
        message.prehashKey = (_b = object.prehashKey) !== null && _b !== void 0 ? _b : 0;
        message.prehashValue = (_c = object.prehashValue) !== null && _c !== void 0 ? _c : 0;
        message.length = (_d = object.length) !== null && _d !== void 0 ? _d : 0;
        message.prefix = (_e = object.prefix) !== null && _e !== void 0 ? _e : new Uint8Array();
        return message;
    },
};
const baseInnerOp = { hash: 0 };
exports.InnerOp = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.hash !== 0) {
            writer.uint32(8).int32(message.hash);
        }
        if (message.prefix.length !== 0) {
            writer.uint32(18).bytes(message.prefix);
        }
        if (message.suffix.length !== 0) {
            writer.uint32(26).bytes(message.suffix);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseInnerOp);
        message.prefix = new Uint8Array();
        message.suffix = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.int32();
                    break;
                case 2:
                    message.prefix = reader.bytes();
                    break;
                case 3:
                    message.suffix = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseInnerOp);
        message.prefix = new Uint8Array();
        message.suffix = new Uint8Array();
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = hashOpFromJSON(object.hash);
        }
        else {
            message.hash = 0;
        }
        if (object.prefix !== undefined && object.prefix !== null) {
            message.prefix = bytesFromBase64(object.prefix);
        }
        if (object.suffix !== undefined && object.suffix !== null) {
            message.suffix = bytesFromBase64(object.suffix);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = hashOpToJSON(message.hash));
        message.prefix !== undefined &&
            (obj.prefix = base64FromBytes(message.prefix !== undefined ? message.prefix : new Uint8Array()));
        message.suffix !== undefined &&
            (obj.suffix = base64FromBytes(message.suffix !== undefined ? message.suffix : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseInnerOp);
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : 0;
        message.prefix = (_b = object.prefix) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.suffix = (_c = object.suffix) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
const baseProofSpec = { maxDepth: 0, minDepth: 0 };
exports.ProofSpec = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.leafSpec !== undefined) {
            exports.LeafOp.encode(message.leafSpec, writer.uint32(10).fork()).ldelim();
        }
        if (message.innerSpec !== undefined) {
            exports.InnerSpec.encode(message.innerSpec, writer.uint32(18).fork()).ldelim();
        }
        if (message.maxDepth !== 0) {
            writer.uint32(24).int32(message.maxDepth);
        }
        if (message.minDepth !== 0) {
            writer.uint32(32).int32(message.minDepth);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseProofSpec);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.leafSpec = exports.LeafOp.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.innerSpec = exports.InnerSpec.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.maxDepth = reader.int32();
                    break;
                case 4:
                    message.minDepth = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseProofSpec);
        if (object.leafSpec !== undefined && object.leafSpec !== null) {
            message.leafSpec = exports.LeafOp.fromJSON(object.leafSpec);
        }
        else {
            message.leafSpec = undefined;
        }
        if (object.innerSpec !== undefined && object.innerSpec !== null) {
            message.innerSpec = exports.InnerSpec.fromJSON(object.innerSpec);
        }
        else {
            message.innerSpec = undefined;
        }
        if (object.maxDepth !== undefined && object.maxDepth !== null) {
            message.maxDepth = Number(object.maxDepth);
        }
        else {
            message.maxDepth = 0;
        }
        if (object.minDepth !== undefined && object.minDepth !== null) {
            message.minDepth = Number(object.minDepth);
        }
        else {
            message.minDepth = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.leafSpec !== undefined &&
            (obj.leafSpec = message.leafSpec ? exports.LeafOp.toJSON(message.leafSpec) : undefined);
        message.innerSpec !== undefined &&
            (obj.innerSpec = message.innerSpec ? exports.InnerSpec.toJSON(message.innerSpec) : undefined);
        message.maxDepth !== undefined && (obj.maxDepth = message.maxDepth);
        message.minDepth !== undefined && (obj.minDepth = message.minDepth);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseProofSpec);
        if (object.leafSpec !== undefined && object.leafSpec !== null) {
            message.leafSpec = exports.LeafOp.fromPartial(object.leafSpec);
        }
        else {
            message.leafSpec = undefined;
        }
        if (object.innerSpec !== undefined && object.innerSpec !== null) {
            message.innerSpec = exports.InnerSpec.fromPartial(object.innerSpec);
        }
        else {
            message.innerSpec = undefined;
        }
        message.maxDepth = (_a = object.maxDepth) !== null && _a !== void 0 ? _a : 0;
        message.minDepth = (_b = object.minDepth) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
const baseInnerSpec = {
    childOrder: 0,
    childSize: 0,
    minPrefixLength: 0,
    maxPrefixLength: 0,
    hash: 0,
};
exports.InnerSpec = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.childOrder) {
            writer.int32(v);
        }
        writer.ldelim();
        if (message.childSize !== 0) {
            writer.uint32(16).int32(message.childSize);
        }
        if (message.minPrefixLength !== 0) {
            writer.uint32(24).int32(message.minPrefixLength);
        }
        if (message.maxPrefixLength !== 0) {
            writer.uint32(32).int32(message.maxPrefixLength);
        }
        if (message.emptyChild.length !== 0) {
            writer.uint32(42).bytes(message.emptyChild);
        }
        if (message.hash !== 0) {
            writer.uint32(48).int32(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseInnerSpec);
        message.childOrder = [];
        message.emptyChild = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.childOrder.push(reader.int32());
                        }
                    }
                    else {
                        message.childOrder.push(reader.int32());
                    }
                    break;
                case 2:
                    message.childSize = reader.int32();
                    break;
                case 3:
                    message.minPrefixLength = reader.int32();
                    break;
                case 4:
                    message.maxPrefixLength = reader.int32();
                    break;
                case 5:
                    message.emptyChild = reader.bytes();
                    break;
                case 6:
                    message.hash = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseInnerSpec);
        message.childOrder = [];
        message.emptyChild = new Uint8Array();
        if (object.childOrder !== undefined && object.childOrder !== null) {
            for (const e of object.childOrder) {
                message.childOrder.push(Number(e));
            }
        }
        if (object.childSize !== undefined && object.childSize !== null) {
            message.childSize = Number(object.childSize);
        }
        else {
            message.childSize = 0;
        }
        if (object.minPrefixLength !== undefined && object.minPrefixLength !== null) {
            message.minPrefixLength = Number(object.minPrefixLength);
        }
        else {
            message.minPrefixLength = 0;
        }
        if (object.maxPrefixLength !== undefined && object.maxPrefixLength !== null) {
            message.maxPrefixLength = Number(object.maxPrefixLength);
        }
        else {
            message.maxPrefixLength = 0;
        }
        if (object.emptyChild !== undefined && object.emptyChild !== null) {
            message.emptyChild = bytesFromBase64(object.emptyChild);
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = hashOpFromJSON(object.hash);
        }
        else {
            message.hash = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.childOrder) {
            obj.childOrder = message.childOrder.map((e) => e);
        }
        else {
            obj.childOrder = [];
        }
        message.childSize !== undefined && (obj.childSize = message.childSize);
        message.minPrefixLength !== undefined && (obj.minPrefixLength = message.minPrefixLength);
        message.maxPrefixLength !== undefined && (obj.maxPrefixLength = message.maxPrefixLength);
        message.emptyChild !== undefined &&
            (obj.emptyChild = base64FromBytes(message.emptyChild !== undefined ? message.emptyChild : new Uint8Array()));
        message.hash !== undefined && (obj.hash = hashOpToJSON(message.hash));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = Object.assign({}, baseInnerSpec);
        message.childOrder = [];
        if (object.childOrder !== undefined && object.childOrder !== null) {
            for (const e of object.childOrder) {
                message.childOrder.push(e);
            }
        }
        message.childSize = (_a = object.childSize) !== null && _a !== void 0 ? _a : 0;
        message.minPrefixLength = (_b = object.minPrefixLength) !== null && _b !== void 0 ? _b : 0;
        message.maxPrefixLength = (_c = object.maxPrefixLength) !== null && _c !== void 0 ? _c : 0;
        message.emptyChild = (_d = object.emptyChild) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.hash = (_e = object.hash) !== null && _e !== void 0 ? _e : 0;
        return message;
    },
};
const baseBatchProof = {};
exports.BatchProof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.entries) {
            exports.BatchEntry.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseBatchProof);
        message.entries = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.entries.push(exports.BatchEntry.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseBatchProof);
        message.entries = [];
        if (object.entries !== undefined && object.entries !== null) {
            for (const e of object.entries) {
                message.entries.push(exports.BatchEntry.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.entries) {
            obj.entries = message.entries.map((e) => (e ? exports.BatchEntry.toJSON(e) : undefined));
        }
        else {
            obj.entries = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseBatchProof);
        message.entries = [];
        if (object.entries !== undefined && object.entries !== null) {
            for (const e of object.entries) {
                message.entries.push(exports.BatchEntry.fromPartial(e));
            }
        }
        return message;
    },
};
const baseBatchEntry = {};
exports.BatchEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.exist !== undefined) {
            exports.ExistenceProof.encode(message.exist, writer.uint32(10).fork()).ldelim();
        }
        if (message.nonexist !== undefined) {
            exports.NonExistenceProof.encode(message.nonexist, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseBatchEntry);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.exist = exports.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nonexist = exports.NonExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseBatchEntry);
        if (object.exist !== undefined && object.exist !== null) {
            message.exist = exports.ExistenceProof.fromJSON(object.exist);
        }
        else {
            message.exist = undefined;
        }
        if (object.nonexist !== undefined && object.nonexist !== null) {
            message.nonexist = exports.NonExistenceProof.fromJSON(object.nonexist);
        }
        else {
            message.nonexist = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.exist !== undefined &&
            (obj.exist = message.exist ? exports.ExistenceProof.toJSON(message.exist) : undefined);
        message.nonexist !== undefined &&
            (obj.nonexist = message.nonexist ? exports.NonExistenceProof.toJSON(message.nonexist) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseBatchEntry);
        if (object.exist !== undefined && object.exist !== null) {
            message.exist = exports.ExistenceProof.fromPartial(object.exist);
        }
        else {
            message.exist = undefined;
        }
        if (object.nonexist !== undefined && object.nonexist !== null) {
            message.nonexist = exports.NonExistenceProof.fromPartial(object.nonexist);
        }
        else {
            message.nonexist = undefined;
        }
        return message;
    },
};
const baseCompressedBatchProof = {};
exports.CompressedBatchProof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.entries) {
            exports.CompressedBatchEntry.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.lookupInners) {
            exports.InnerOp.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCompressedBatchProof);
        message.entries = [];
        message.lookupInners = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.entries.push(exports.CompressedBatchEntry.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.lookupInners.push(exports.InnerOp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCompressedBatchProof);
        message.entries = [];
        message.lookupInners = [];
        if (object.entries !== undefined && object.entries !== null) {
            for (const e of object.entries) {
                message.entries.push(exports.CompressedBatchEntry.fromJSON(e));
            }
        }
        if (object.lookupInners !== undefined && object.lookupInners !== null) {
            for (const e of object.lookupInners) {
                message.lookupInners.push(exports.InnerOp.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.entries) {
            obj.entries = message.entries.map((e) => (e ? exports.CompressedBatchEntry.toJSON(e) : undefined));
        }
        else {
            obj.entries = [];
        }
        if (message.lookupInners) {
            obj.lookupInners = message.lookupInners.map((e) => (e ? exports.InnerOp.toJSON(e) : undefined));
        }
        else {
            obj.lookupInners = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseCompressedBatchProof);
        message.entries = [];
        if (object.entries !== undefined && object.entries !== null) {
            for (const e of object.entries) {
                message.entries.push(exports.CompressedBatchEntry.fromPartial(e));
            }
        }
        message.lookupInners = [];
        if (object.lookupInners !== undefined && object.lookupInners !== null) {
            for (const e of object.lookupInners) {
                message.lookupInners.push(exports.InnerOp.fromPartial(e));
            }
        }
        return message;
    },
};
const baseCompressedBatchEntry = {};
exports.CompressedBatchEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.exist !== undefined) {
            exports.CompressedExistenceProof.encode(message.exist, writer.uint32(10).fork()).ldelim();
        }
        if (message.nonexist !== undefined) {
            exports.CompressedNonExistenceProof.encode(message.nonexist, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCompressedBatchEntry);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.exist = exports.CompressedExistenceProof.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nonexist = exports.CompressedNonExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCompressedBatchEntry);
        if (object.exist !== undefined && object.exist !== null) {
            message.exist = exports.CompressedExistenceProof.fromJSON(object.exist);
        }
        else {
            message.exist = undefined;
        }
        if (object.nonexist !== undefined && object.nonexist !== null) {
            message.nonexist = exports.CompressedNonExistenceProof.fromJSON(object.nonexist);
        }
        else {
            message.nonexist = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.exist !== undefined &&
            (obj.exist = message.exist ? exports.CompressedExistenceProof.toJSON(message.exist) : undefined);
        message.nonexist !== undefined &&
            (obj.nonexist = message.nonexist ? exports.CompressedNonExistenceProof.toJSON(message.nonexist) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseCompressedBatchEntry);
        if (object.exist !== undefined && object.exist !== null) {
            message.exist = exports.CompressedExistenceProof.fromPartial(object.exist);
        }
        else {
            message.exist = undefined;
        }
        if (object.nonexist !== undefined && object.nonexist !== null) {
            message.nonexist = exports.CompressedNonExistenceProof.fromPartial(object.nonexist);
        }
        else {
            message.nonexist = undefined;
        }
        return message;
    },
};
const baseCompressedExistenceProof = { path: 0 };
exports.CompressedExistenceProof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        if (message.leaf !== undefined) {
            exports.LeafOp.encode(message.leaf, writer.uint32(26).fork()).ldelim();
        }
        writer.uint32(34).fork();
        for (const v of message.path) {
            writer.int32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCompressedExistenceProof);
        message.path = [];
        message.key = new Uint8Array();
        message.value = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                case 3:
                    message.leaf = exports.LeafOp.decode(reader, reader.uint32());
                    break;
                case 4:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.path.push(reader.int32());
                        }
                    }
                    else {
                        message.path.push(reader.int32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCompressedExistenceProof);
        message.path = [];
        message.key = new Uint8Array();
        message.value = new Uint8Array();
        if (object.key !== undefined && object.key !== null) {
            message.key = bytesFromBase64(object.key);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        if (object.leaf !== undefined && object.leaf !== null) {
            message.leaf = exports.LeafOp.fromJSON(object.leaf);
        }
        else {
            message.leaf = undefined;
        }
        if (object.path !== undefined && object.path !== null) {
            for (const e of object.path) {
                message.path.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined &&
            (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.leaf !== undefined && (obj.leaf = message.leaf ? exports.LeafOp.toJSON(message.leaf) : undefined);
        if (message.path) {
            obj.path = message.path.map((e) => e);
        }
        else {
            obj.path = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseCompressedExistenceProof);
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array();
        if (object.leaf !== undefined && object.leaf !== null) {
            message.leaf = exports.LeafOp.fromPartial(object.leaf);
        }
        else {
            message.leaf = undefined;
        }
        message.path = [];
        if (object.path !== undefined && object.path !== null) {
            for (const e of object.path) {
                message.path.push(e);
            }
        }
        return message;
    },
};
const baseCompressedNonExistenceProof = {};
exports.CompressedNonExistenceProof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.left !== undefined) {
            exports.CompressedExistenceProof.encode(message.left, writer.uint32(18).fork()).ldelim();
        }
        if (message.right !== undefined) {
            exports.CompressedExistenceProof.encode(message.right, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCompressedNonExistenceProof);
        message.key = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.left = exports.CompressedExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.right = exports.CompressedExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCompressedNonExistenceProof);
        message.key = new Uint8Array();
        if (object.key !== undefined && object.key !== null) {
            message.key = bytesFromBase64(object.key);
        }
        if (object.left !== undefined && object.left !== null) {
            message.left = exports.CompressedExistenceProof.fromJSON(object.left);
        }
        else {
            message.left = undefined;
        }
        if (object.right !== undefined && object.right !== null) {
            message.right = exports.CompressedExistenceProof.fromJSON(object.right);
        }
        else {
            message.right = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined &&
            (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
        message.left !== undefined &&
            (obj.left = message.left ? exports.CompressedExistenceProof.toJSON(message.left) : undefined);
        message.right !== undefined &&
            (obj.right = message.right ? exports.CompressedExistenceProof.toJSON(message.right) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseCompressedNonExistenceProof);
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
        if (object.left !== undefined && object.left !== null) {
            message.left = exports.CompressedExistenceProof.fromPartial(object.left);
        }
        else {
            message.left = undefined;
        }
        if (object.right !== undefined && object.right !== null) {
            message.right = exports.CompressedExistenceProof.fromPartial(object.right);
        }
        else {
            message.right = undefined;
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
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=proofs.js.map
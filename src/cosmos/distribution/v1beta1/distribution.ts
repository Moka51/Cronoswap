"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityPoolSpendProposalWithDeposit = exports.DelegationDelegatorReward = exports.DelegatorStartingInfo = exports.CommunityPoolSpendProposal = exports.FeePool = exports.ValidatorSlashEvents = exports.ValidatorSlashEvent = exports.ValidatorOutstandingRewards = exports.ValidatorAccumulatedCommission = exports.ValidatorCurrentRewards = exports.ValidatorHistoricalRewards = exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.distribution.v1beta1";
const baseParams = {
    communityTax: "",
    baseProposerReward: "",
    bonusProposerReward: "",
    withdrawAddrEnabled: false,
};
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.communityTax !== "") {
            writer.uint32(10).string(message.communityTax);
        }
        if (message.baseProposerReward !== "") {
            writer.uint32(18).string(message.baseProposerReward);
        }
        if (message.bonusProposerReward !== "") {
            writer.uint32(26).string(message.bonusProposerReward);
        }
        if (message.withdrawAddrEnabled === true) {
            writer.uint32(32).bool(message.withdrawAddrEnabled);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseParams);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.communityTax = reader.string();
                    break;
                case 2:
                    message.baseProposerReward = reader.string();
                    break;
                case 3:
                    message.bonusProposerReward = reader.string();
                    break;
                case 4:
                    message.withdrawAddrEnabled = reader.bool();
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
        if (object.communityTax !== undefined && object.communityTax !== null) {
            message.communityTax = String(object.communityTax);
        }
        else {
            message.communityTax = "";
        }
        if (object.baseProposerReward !== undefined && object.baseProposerReward !== null) {
            message.baseProposerReward = String(object.baseProposerReward);
        }
        else {
            message.baseProposerReward = "";
        }
        if (object.bonusProposerReward !== undefined && object.bonusProposerReward !== null) {
            message.bonusProposerReward = String(object.bonusProposerReward);
        }
        else {
            message.bonusProposerReward = "";
        }
        if (object.withdrawAddrEnabled !== undefined && object.withdrawAddrEnabled !== null) {
            message.withdrawAddrEnabled = Boolean(object.withdrawAddrEnabled);
        }
        else {
            message.withdrawAddrEnabled = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.communityTax !== undefined && (obj.communityTax = message.communityTax);
        message.baseProposerReward !== undefined && (obj.baseProposerReward = message.baseProposerReward);
        message.bonusProposerReward !== undefined && (obj.bonusProposerReward = message.bonusProposerReward);
        message.withdrawAddrEnabled !== undefined && (obj.withdrawAddrEnabled = message.withdrawAddrEnabled);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseParams);
        message.communityTax = (_a = object.communityTax) !== null && _a !== void 0 ? _a : "";
        message.baseProposerReward = (_b = object.baseProposerReward) !== null && _b !== void 0 ? _b : "";
        message.bonusProposerReward = (_c = object.bonusProposerReward) !== null && _c !== void 0 ? _c : "";
        message.withdrawAddrEnabled = (_d = object.withdrawAddrEnabled) !== null && _d !== void 0 ? _d : false;
        return message;
    },
};
const baseValidatorHistoricalRewards = { referenceCount: 0 };
exports.ValidatorHistoricalRewards = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.cumulativeRewardRatio) {
            coin_1.DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.referenceCount !== 0) {
            writer.uint32(16).uint32(message.referenceCount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorHistoricalRewards);
        message.cumulativeRewardRatio = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cumulativeRewardRatio.push(coin_1.DecCoin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.referenceCount = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorHistoricalRewards);
        message.cumulativeRewardRatio = [];
        if (object.cumulativeRewardRatio !== undefined && object.cumulativeRewardRatio !== null) {
            for (const e of object.cumulativeRewardRatio) {
                message.cumulativeRewardRatio.push(coin_1.DecCoin.fromJSON(e));
            }
        }
        if (object.referenceCount !== undefined && object.referenceCount !== null) {
            message.referenceCount = Number(object.referenceCount);
        }
        else {
            message.referenceCount = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.cumulativeRewardRatio) {
            obj.cumulativeRewardRatio = message.cumulativeRewardRatio.map((e) => e ? coin_1.DecCoin.toJSON(e) : undefined);
        }
        else {
            obj.cumulativeRewardRatio = [];
        }
        message.referenceCount !== undefined && (obj.referenceCount = message.referenceCount);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseValidatorHistoricalRewards);
        message.cumulativeRewardRatio = [];
        if (object.cumulativeRewardRatio !== undefined && object.cumulativeRewardRatio !== null) {
            for (const e of object.cumulativeRewardRatio) {
                message.cumulativeRewardRatio.push(coin_1.DecCoin.fromPartial(e));
            }
        }
        message.referenceCount = (_a = object.referenceCount) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
const baseValidatorCurrentRewards = { period: long_1.default.UZERO };
exports.ValidatorCurrentRewards = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.rewards) {
            coin_1.DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (!message.period.isZero()) {
            writer.uint32(16).uint64(message.period);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorCurrentRewards);
        message.rewards = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards.push(coin_1.DecCoin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.period = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorCurrentRewards);
        message.rewards = [];
        if (object.rewards !== undefined && object.rewards !== null) {
            for (const e of object.rewards) {
                message.rewards.push(coin_1.DecCoin.fromJSON(e));
            }
        }
        if (object.period !== undefined && object.period !== null) {
            message.period = long_1.default.fromString(object.period);
        }
        else {
            message.period = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.rewards) {
            obj.rewards = message.rewards.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.rewards = [];
        }
        message.period !== undefined && (obj.period = (message.period || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseValidatorCurrentRewards);
        message.rewards = [];
        if (object.rewards !== undefined && object.rewards !== null) {
            for (const e of object.rewards) {
                message.rewards.push(coin_1.DecCoin.fromPartial(e));
            }
        }
        if (object.period !== undefined && object.period !== null) {
            message.period = object.period;
        }
        else {
            message.period = long_1.default.UZERO;
        }
        return message;
    },
};
const baseValidatorAccumulatedCommission = {};
exports.ValidatorAccumulatedCommission = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.commission) {
            coin_1.DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorAccumulatedCommission);
        message.commission = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commission.push(coin_1.DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorAccumulatedCommission);
        message.commission = [];
        if (object.commission !== undefined && object.commission !== null) {
            for (const e of object.commission) {
                message.commission.push(coin_1.DecCoin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.commission) {
            obj.commission = message.commission.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.commission = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseValidatorAccumulatedCommission);
        message.commission = [];
        if (object.commission !== undefined && object.commission !== null) {
            for (const e of object.commission) {
                message.commission.push(coin_1.DecCoin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseValidatorOutstandingRewards = {};
exports.ValidatorOutstandingRewards = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.rewards) {
            coin_1.DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorOutstandingRewards);
        message.rewards = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards.push(coin_1.DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorOutstandingRewards);
        message.rewards = [];
        if (object.rewards !== undefined && object.rewards !== null) {
            for (const e of object.rewards) {
                message.rewards.push(coin_1.DecCoin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.rewards) {
            obj.rewards = message.rewards.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.rewards = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseValidatorOutstandingRewards);
        message.rewards = [];
        if (object.rewards !== undefined && object.rewards !== null) {
            for (const e of object.rewards) {
                message.rewards.push(coin_1.DecCoin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseValidatorSlashEvent = { validatorPeriod: long_1.default.UZERO, fraction: "" };
exports.ValidatorSlashEvent = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.validatorPeriod.isZero()) {
            writer.uint32(8).uint64(message.validatorPeriod);
        }
        if (message.fraction !== "") {
            writer.uint32(18).string(message.fraction);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorSlashEvent);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorPeriod = reader.uint64();
                    break;
                case 2:
                    message.fraction = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorSlashEvent);
        if (object.validatorPeriod !== undefined && object.validatorPeriod !== null) {
            message.validatorPeriod = long_1.default.fromString(object.validatorPeriod);
        }
        else {
            message.validatorPeriod = long_1.default.UZERO;
        }
        if (object.fraction !== undefined && object.fraction !== null) {
            message.fraction = String(object.fraction);
        }
        else {
            message.fraction = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validatorPeriod !== undefined &&
            (obj.validatorPeriod = (message.validatorPeriod || long_1.default.UZERO).toString());
        message.fraction !== undefined && (obj.fraction = message.fraction);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseValidatorSlashEvent);
        if (object.validatorPeriod !== undefined && object.validatorPeriod !== null) {
            message.validatorPeriod = object.validatorPeriod;
        }
        else {
            message.validatorPeriod = long_1.default.UZERO;
        }
        message.fraction = (_a = object.fraction) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseValidatorSlashEvents = {};
exports.ValidatorSlashEvents = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validatorSlashEvents) {
            exports.ValidatorSlashEvent.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorSlashEvents);
        message.validatorSlashEvents = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorSlashEvents.push(exports.ValidatorSlashEvent.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorSlashEvents);
        message.validatorSlashEvents = [];
        if (object.validatorSlashEvents !== undefined && object.validatorSlashEvents !== null) {
            for (const e of object.validatorSlashEvents) {
                message.validatorSlashEvents.push(exports.ValidatorSlashEvent.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.validatorSlashEvents) {
            obj.validatorSlashEvents = message.validatorSlashEvents.map((e) => e ? exports.ValidatorSlashEvent.toJSON(e) : undefined);
        }
        else {
            obj.validatorSlashEvents = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseValidatorSlashEvents);
        message.validatorSlashEvents = [];
        if (object.validatorSlashEvents !== undefined && object.validatorSlashEvents !== null) {
            for (const e of object.validatorSlashEvents) {
                message.validatorSlashEvents.push(exports.ValidatorSlashEvent.fromPartial(e));
            }
        }
        return message;
    },
};
const baseFeePool = {};
exports.FeePool = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.communityPool) {
            coin_1.DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseFeePool);
        message.communityPool = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.communityPool.push(coin_1.DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseFeePool);
        message.communityPool = [];
        if (object.communityPool !== undefined && object.communityPool !== null) {
            for (const e of object.communityPool) {
                message.communityPool.push(coin_1.DecCoin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.communityPool) {
            obj.communityPool = message.communityPool.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.communityPool = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseFeePool);
        message.communityPool = [];
        if (object.communityPool !== undefined && object.communityPool !== null) {
            for (const e of object.communityPool) {
                message.communityPool.push(coin_1.DecCoin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseCommunityPoolSpendProposal = { title: "", description: "", recipient: "" };
exports.CommunityPoolSpendProposal = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.recipient !== "") {
            writer.uint32(26).string(message.recipient);
        }
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCommunityPoolSpendProposal);
        message.amount = [];
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
                    message.recipient = reader.string();
                    break;
                case 4:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCommunityPoolSpendProposal);
        message.amount = [];
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
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = "";
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(coin_1.Coin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined && (obj.description = message.description);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseCommunityPoolSpendProposal);
        message.title = (_a = object.title) !== null && _a !== void 0 ? _a : "";
        message.description = (_b = object.description) !== null && _b !== void 0 ? _b : "";
        message.recipient = (_c = object.recipient) !== null && _c !== void 0 ? _c : "";
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(coin_1.Coin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseDelegatorStartingInfo = { previousPeriod: long_1.default.UZERO, stake: "", height: long_1.default.UZERO };
exports.DelegatorStartingInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.previousPeriod.isZero()) {
            writer.uint32(8).uint64(message.previousPeriod);
        }
        if (message.stake !== "") {
            writer.uint32(18).string(message.stake);
        }
        if (!message.height.isZero()) {
            writer.uint32(24).uint64(message.height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDelegatorStartingInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.previousPeriod = reader.uint64();
                    break;
                case 2:
                    message.stake = reader.string();
                    break;
                case 3:
                    message.height = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDelegatorStartingInfo);
        if (object.previousPeriod !== undefined && object.previousPeriod !== null) {
            message.previousPeriod = long_1.default.fromString(object.previousPeriod);
        }
        else {
            message.previousPeriod = long_1.default.UZERO;
        }
        if (object.stake !== undefined && object.stake !== null) {
            message.stake = String(object.stake);
        }
        else {
            message.stake = "";
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = long_1.default.fromString(object.height);
        }
        else {
            message.height = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.previousPeriod !== undefined &&
            (obj.previousPeriod = (message.previousPeriod || long_1.default.UZERO).toString());
        message.stake !== undefined && (obj.stake = message.stake);
        message.height !== undefined && (obj.height = (message.height || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseDelegatorStartingInfo);
        if (object.previousPeriod !== undefined && object.previousPeriod !== null) {
            message.previousPeriod = object.previousPeriod;
        }
        else {
            message.previousPeriod = long_1.default.UZERO;
        }
        message.stake = (_a = object.stake) !== null && _a !== void 0 ? _a : "";
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        else {
            message.height = long_1.default.UZERO;
        }
        return message;
    },
};
const baseDelegationDelegatorReward = { validatorAddress: "" };
exports.DelegationDelegatorReward = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        for (const v of message.reward) {
            coin_1.DecCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDelegationDelegatorReward);
        message.reward = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.reward.push(coin_1.DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDelegationDelegatorReward);
        message.reward = [];
        if (object.validatorAddress !== undefined && object.validatorAddress !== null) {
            message.validatorAddress = String(object.validatorAddress);
        }
        else {
            message.validatorAddress = "";
        }
        if (object.reward !== undefined && object.reward !== null) {
            for (const e of object.reward) {
                message.reward.push(coin_1.DecCoin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        if (message.reward) {
            obj.reward = message.reward.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.reward = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseDelegationDelegatorReward);
        message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
        message.reward = [];
        if (object.reward !== undefined && object.reward !== null) {
            for (const e of object.reward) {
                message.reward.push(coin_1.DecCoin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseCommunityPoolSpendProposalWithDeposit = {
    title: "",
    description: "",
    recipient: "",
    amount: "",
    deposit: "",
};
exports.CommunityPoolSpendProposalWithDeposit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.recipient !== "") {
            writer.uint32(26).string(message.recipient);
        }
        if (message.amount !== "") {
            writer.uint32(34).string(message.amount);
        }
        if (message.deposit !== "") {
            writer.uint32(42).string(message.deposit);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCommunityPoolSpendProposalWithDeposit);
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
                    message.recipient = reader.string();
                    break;
                case 4:
                    message.amount = reader.string();
                    break;
                case 5:
                    message.deposit = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCommunityPoolSpendProposalWithDeposit);
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
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = "";
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount);
        }
        else {
            message.amount = "";
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = String(object.deposit);
        }
        else {
            message.deposit = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.title !== undefined && (obj.title = message.title);
        message.description !== undefined && (obj.description = message.description);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.amount !== undefined && (obj.amount = message.amount);
        message.deposit !== undefined && (obj.deposit = message.deposit);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = Object.assign({}, baseCommunityPoolSpendProposalWithDeposit);
        message.title = (_a = object.title) !== null && _a !== void 0 ? _a : "";
        message.description = (_b = object.description) !== null && _b !== void 0 ? _b : "";
        message.recipient = (_c = object.recipient) !== null && _c !== void 0 ? _c : "";
        message.amount = (_d = object.amount) !== null && _d !== void 0 ? _d : "";
        message.deposit = (_e = object.deposit) !== null && _e !== void 0 ? _e : "";
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=distribution.js.map
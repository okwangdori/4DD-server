"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSubInfo_1 = __importDefault(require("../models/UserSubInfo"));
const logger_1 = __importDefault(require("../log/logger"));
const createUserSubInfo = (userSubInfoCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userSubInfo = new UserSubInfo_1.default({
            views: userSubInfoCreateDto.views,
            likes: userSubInfoCreateDto.likes,
            unit_total_count: userSubInfoCreateDto.unit_total_count,
        });
        yield userSubInfo.save();
        const data = {
            _id: userSubInfo.id,
        };
        return data;
    }
    catch (error) {
        logger_1.default.error("userSubInfoService > createUserSubInfo : error : ", error);
        throw error;
    }
});
const updateUserSubInfo = (userSubInfoId, userSubInfoUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserSubInfo_1.default.findByIdAndUpdate(userSubInfoId, userSubInfoUpdateDto);
        const userSubInfo = yield findUserSubInfoById(userSubInfoId);
        // null이 될 경우를 처리해줘야 한다.
        if (!userSubInfo) {
            logger_1.default.error("userSubInfoService > updateUserSubInfo > userSubInfo is null : error", userSubInfo);
            return null;
        }
        return userSubInfo;
    }
    catch (error) {
        logger_1.default.error("userSubInfoService > updateUserSubInfo : error : ", error);
        throw error;
    }
});
const findUserSubInfoById = (userSubInfoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userSubInfo = yield UserSubInfo_1.default.findById(userSubInfoId);
        if (!userSubInfo) {
            return null;
        }
        return userSubInfo;
    }
    catch (error) {
        logger_1.default.error("userSubInfoService > findUserSubInfoById : error : ", error);
        throw error;
    }
});
const deleteUserSubInfo = (userSubInfoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userSubInfo = yield UserSubInfo_1.default.findByIdAndDelete(userSubInfoId);
        if (!userSubInfo) {
            return null;
        }
        return userSubInfo;
    }
    catch (error) {
        logger_1.default.error("userSubInfoService > deleteUserSubInfo : error : ", error);
        throw error;
    }
});
exports.default = {
    createUserSubInfo,
    updateUserSubInfo,
    findUserSubInfoById,
    deleteUserSubInfo,
};
//# sourceMappingURL=userSubInfoService.js.map
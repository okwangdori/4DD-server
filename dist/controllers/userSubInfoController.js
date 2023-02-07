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
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const util_1 = __importDefault(require("../modules/util"));
const services_1 = require("../services");
const logger_1 = __importDefault(require("../log/logger"));
const createUserSubInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSubInfoCreateDto = req.body;
    try {
        const data = yield services_1.userSubInfoService.createUserSubInfo(userSubInfoCreateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
        logger_1.default.error("userSubInfoController > createUserSubInfo : error : ", error);
    }
});
const findAndUpdateUserSubInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSubInfoUpdateDto = req.body;
    try {
        const { userSubInfoId } = req.params;
        const data = yield services_1.userSubInfoService.findUserSubInfoById(userSubInfoId);
        if (data) {
            if (data.likes) {
                if (req.body.like) {
                    if (data.likes.indexOf(req.body.id) == -1) {
                        data.likes.push(req.body.id);
                    }
                }
                else {
                    data.likes.splice(data.likes.indexOf(req.body.id), 1);
                }
            }
        }
        userSubInfoUpdateDto.likes = data === null || data === void 0 ? void 0 : data.likes;
        const updateData = yield services_1.userSubInfoService.updateUserSubInfo(userSubInfoId, userSubInfoUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_UNIT_TITLE_SUCCESS, updateData));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
        logger_1.default.error("userSubInfoController > findAndUpdateUserSubInfo : error : ", error);
    }
});
const updateUserSubInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSubInfoUpdateDto = req.body;
    const { userSubInfoId } = req.params;
    try {
        const data = yield services_1.userSubInfoService.updateUserSubInfo(userSubInfoId, userSubInfoUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
        logger_1.default.error("userSubInfoController > updateUserSubInfo : error : ", error);
    }
});
const findUserSubInfoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userSubInfoId } = req.params;
        const data = yield services_1.userSubInfoService.findUserSubInfoById(userSubInfoId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
        logger_1.default.error("userSubInfoController > findUserSubInfoById : error : ", error);
    }
});
const deleteUserSubInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userSubInfoId } = req.params;
    try {
        const data = yield services_1.userSubInfoService.deleteUserSubInfo(userSubInfoId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.DELETE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
        logger_1.default.error("userSubInfoController > deleteUserSubInfo : error : ", error);
    }
});
exports.default = {
    createUserSubInfo,
    findAndUpdateUserSubInfo,
    updateUserSubInfo,
    findUserSubInfoById,
    deleteUserSubInfo,
};
//# sourceMappingURL=userSubInfoController.js.map
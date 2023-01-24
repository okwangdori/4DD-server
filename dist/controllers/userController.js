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
const constants_1 = require("../constants");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfoDto = req.body;
    const userCreateDto = req.body;
    try {
        const checkName = yield services_1.userService.checkName(userInfoDto);
        const checkEmail = yield services_1.userService.checkEmail(userInfoDto);
        if (checkName) {
            res
                .status(statusCode_1.default.FORBIDDEN)
                .send(util_1.default.fail(statusCode_1.default.FORBIDDEN, responseMessage_1.default.ALREADY_EXIST_NAME));
            return;
        }
        if (checkEmail) {
            res
                .status(statusCode_1.default.FORBIDDEN)
                .send(util_1.default.fail(statusCode_1.default.FORBIDDEN, responseMessage_1.default.ALREADY_EXIST_EMAIL));
            return;
        }
        //23.01.21 HWI 회원가입 전 userSubInfo 생성
        const unit = yield services_1.unitTitleService.findUnitTitleIdList();
        let userSubInfoCreateDto = unit;
        const subInfoId = yield services_1.userSubInfoService.createUserSubInfo(userSubInfoCreateDto);
        userCreateDto.user_sub_info = subInfoId._id;
        const data = yield services_1.userService.register(userCreateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_USER_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUpdateDto = req.body;
    const { userId } = req.params;
    try {
        const data = yield services_1.userService.updateUser(userId, userUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_USER_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const data = yield services_1.userService.findUserById(userId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_USER_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.userService.getUsers();
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_USER_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreateDto = req.body;
    try {
        const data = yield services_1.userService.login(userCreateDto);
        res.cookie(constants_1.REFRESHTOKEN, data === null || data === void 0 ? void 0 : data.refreshToken, constants_1.refreshTokenCookieOptions);
        res.cookie(constants_1.ACCESSTOKEN, data === null || data === void 0 ? void 0 : data.accessToken, constants_1.accessTokenCookieOptions);
        if (data) {
            res
                .status(statusCode_1.default.CREATED)
                .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.LOGIN_SUCCESS, data));
        }
        else {
            res
                .status(statusCode_1.default.NOT_FOUND)
                .send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.INVALID_EMAIL_OR_PASSWORD));
        }
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie(constants_1.REFRESHTOKEN, "");
        res.cookie(constants_1.ACCESSTOKEN, "");
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.LOGOUT_SUCCESS));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUpdateDto = req.body;
    try {
        const data = yield services_1.userService.changePassword(userUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.CHANGE_PASSWORD_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const data = yield services_1.userService.deleteUser(userId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.DELETE_POST_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    register,
    updateUser,
    findUserById,
    getUsers,
    login,
    logout,
    changePassword,
    deleteUser,
};
//# sourceMappingURL=userController.js.map
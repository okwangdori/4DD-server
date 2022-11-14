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
const user_1 = __importDefault(require("../models/user"));
const jwt_utill_1 = require("../utills/jwt.utill");
const logger_1 = __importDefault(require("../log/logger"));
const signup = (userCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // create를 위해 각 filed명에 값들을 할당시켜준다.
        const user = new user_1.default({
            name: userCreateDto.name,
            email: userCreateDto.email,
            password: userCreateDto.password
        });
        yield user.save();
        const data = {
            _id: user.id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updateUser = (userId, userUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndUpdate(userId, userUpdateDto); // update 로직
        const user = yield findUserById(userId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
        if (!user) {
            return null;
        }
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return null;
        }
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("@!@@@#@#@#@# test");
        const users = yield user_1.default.find();
        if (!users) {
            return null;
        }
        return users;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const login = (userCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: userCreateDto.email });
        // 계정, 비밀번호 체크
        if (!user || user.password !== userCreateDto.password) {
            return null;
        }
        const tokenOption = {
            id: user._id,
            email: user.email
        };
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: (0, jwt_utill_1.createToken)('access', tokenOption),
            refreshToken: (0, jwt_utill_1.createToken)('refresh', tokenOption)
        };
        return userData;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndDelete(userId);
        if (!user) {
            return null;
        }
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    signup,
    updateUser,
    findUserById,
    getUsers,
    login,
    deleteUser,
};
//# sourceMappingURL=userService.js.map
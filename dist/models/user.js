"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    //유저 회원가입 중 user생성하기 전에 userSubInfo 먼저 생성 후 생성된 userSubInfo의 아이디를 가져와서 저장
    user_sub_info: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "UserSubInfo",
    },
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map
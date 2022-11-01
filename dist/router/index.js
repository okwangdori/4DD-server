"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postRouter_1 = __importDefault(require("./postRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const unitRouter_1 = __importDefault(require("./unitRouter"));
const router = (0, express_1.Router)();
//글쓰기 읽기 수정하기 삭제하기 참고용 api
router.use('/post', postRouter_1.default);
//단원 api
router.use('/unit/title', unitRouter_1.default);
//사용자 api
router.use('/user', userRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map
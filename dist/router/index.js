"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postRouter_1 = __importDefault(require("./postRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const boardRouter_1 = __importDefault(require("./boardRouter"));
const unitRouter_1 = __importDefault(require("./unitRouter"));
const unitDetailRouter_1 = __importDefault(require("./unitDetailRouter"));
const jwtMiddleware_1 = __importDefault(require("../middlewares/jwtMiddleware"));
const userSubInfoRouter_1 = __importDefault(require("./userSubInfoRouter"));
const interviewRouter_1 = __importDefault(require("./interviewRouter"));
// import interviewContentsRouter from "./interviewContentsRouter";
const router = (0, express_1.Router)();
//게시판 api
router.use("/post", postRouter_1.default);
//단원 api
router.use("/unit/title", unitRouter_1.default);
//단원별 상세 내용 api
router.use("/unit/detail", unitDetailRouter_1.default);
//사용자 api
router.use("/user", jwtMiddleware_1.default, userRouter_1.default);
//게시판 api
router.use("/board", boardRouter_1.default);
//사용자 기타 정보 api
router.use("/user/subinfo", jwtMiddleware_1.default, userSubInfoRouter_1.default);
//면접질문 목록
router.use("/interview", interviewRouter_1.default);
//면접질문 내용 목록
// router.use("/interview/contents", interviewContentsRouter);
exports.default = router;
//# sourceMappingURL=index.js.map
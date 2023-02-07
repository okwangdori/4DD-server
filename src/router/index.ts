import { Router } from "express";
import postRouter from "./postRouter";
import userRouter from "./userRouter";
import boardRouter from "./boardRouter";
import unitRouter from "./unitRouter";
import unitDetailRouter from "./unitDetailRouter";
import jwtMiddleware from "../middlewares/jwtMiddleware";
import userSubInfoRouter from "./userSubInfoRouter";
import interviewRouter from "./interviewRouter";
// import interviewContentsRouter from "./interviewContentsRouter";

const router: Router = Router();

//게시판 api
router.use("/post", postRouter);

//단원 api
router.use("/unit/title", unitRouter);

//단원별 상세 내용 api
router.use("/unit/detail", unitDetailRouter);

//사용자 api
router.use("/user", jwtMiddleware, userRouter);

//게시판 api
router.use("/board", boardRouter);

//사용자 기타 정보 api
router.use("/user/subinfo", jwtMiddleware, userSubInfoRouter);

//면접질문 목록
router.use("/interview", interviewRouter);

//면접질문 내용 목록
// router.use("/interview/contents", interviewContentsRouter);

export default router;

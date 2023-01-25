import { Router } from "express";
import postRouter from "./postRouter";
import userRouter from "./userRouter";
import boardRouter from "./boardRouter";
import unitRouter from "./unitRouter";
import unitDetailRouter from "./unitDetailRouter";
import jwtMiddleware from "../middlewares/jwtMiddleware";
import userSubInfo from "./userSubInfoRouter";

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
router.use("/user/subinfo", jwtMiddleware, userSubInfo);

export default router;

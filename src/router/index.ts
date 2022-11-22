import { Router } from 'express';
import postRouter from "./postRouter";
import userRouter from "./userRouter";
import boardRouter from "./userRouter";
import unitRouter from "./unitRouter";
import jwtMiddleware from "../middlewares/jwtMiddleware";

const router: Router = Router();

//글쓰기 읽기 수정하기 삭제하기 참고용 api
router.use('/post', postRouter);

//단원 api
router.use('/unit/title', unitRouter);

//사용자 api
router.use('/user', jwtMiddleware, userRouter);

//게시판 api
router.use('/board', jwtMiddleware, boardRouter);

export default router;
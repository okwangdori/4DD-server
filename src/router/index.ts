import { Router } from 'express';
import postRouter from "./postRouter";
import unitRouter from "./unitRouter";

const router: Router = Router();

//글쓰기 읽기 수정하기 삭제하기 참고용 api
router.use('/post', postRouter);

//단원 api
router.use('/unit/title', unitRouter);

export default router;
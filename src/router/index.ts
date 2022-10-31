import { Router } from 'express';
import postRouter from "./postRouter";

const router: Router = Router();

router.use('/post', postRouter);

export default router;
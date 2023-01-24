import express, { Router } from "express";
import { postController } from "../controllers";
import postRouter from "./postRouter";
import commentRouter from "./commentRouter";

const router: Router = express.Router();

//게시물 api
router.use('/post', postRouter);

router.get('/', postController.getPosts);

//댓글 api
router.use('/comment', commentRouter);

export default router;
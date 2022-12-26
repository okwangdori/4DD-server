import express, { Router } from "express";
import { postController } from "../controllers";
import postRouter from "./postRouter";

const router: Router = express.Router();

//게시물 api
router.use('/post', postRouter);

router.get('/', postController.getPosts);

export default router;
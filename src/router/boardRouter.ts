import express, { Router } from "express";
import { postController } from "../controllers";

const router: Router = express.Router();

router.get('/posts', postController.getPosts);

export default router;
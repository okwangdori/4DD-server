import { Router } from "express";
import { postController } from "../controllers";

const router: Router = Router();

router.post('/register', postController.createPost);
router.put('/:postId', postController.updatePost);
router.get('/:postId', postController.findPostById);
router.delete('/:postId', postController.deletePost);

export default router;
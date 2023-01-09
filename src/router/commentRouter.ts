import { Router } from "express";
import { commentController } from "../controllers";

const router: Router = Router();

router.post('/register', commentController.createComment);
router.put('/:commentId', commentController.updateComment);
router.put("/list/:commentId", commentController.updateCommentTree);
router.get("/", commentController.findCommentAll);
router.get("/:postId", commentController.findPostById);
router.get("/list/:commentId", commentController.findCommentTree);
router.delete('/:commentId', commentController.deleteComment);

export default router;
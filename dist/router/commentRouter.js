"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/register', controllers_1.commentController.createComment);
router.put('/:commentId', controllers_1.commentController.updateComment);
router.put("/list/:commentId", controllers_1.commentController.updateCommentTree);
router.get("/", controllers_1.commentController.findCommentAll);
router.get("/:postId", controllers_1.commentController.findPostById);
router.get("/list/:postId", controllers_1.commentController.findCommentTree);
router.delete('/:commentId', controllers_1.commentController.deleteComment);
exports.default = router;
//# sourceMappingURL=commentRouter.js.map
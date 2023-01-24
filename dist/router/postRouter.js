"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/register', controllers_1.postController.createPost);
router.put('/:postId', controllers_1.postController.updatePost);
router.get('/:postId', controllers_1.postController.findPostById);
router.delete('/:postId', controllers_1.postController.deletePost);
exports.default = router;
//# sourceMappingURL=postRouter.js.map
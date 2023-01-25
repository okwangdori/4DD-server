"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const postRouter_1 = __importDefault(require("./postRouter"));
const router = express_1.default.Router();
//게시물 api
router.use('/post', postRouter_1.default);
router.get('/', controllers_1.postController.getPosts);
exports.default = router;
//# sourceMappingURL=boardRouter.js.map
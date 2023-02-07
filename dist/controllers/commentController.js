"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const util_1 = __importDefault(require("../modules/util"));
const services_1 = require("../services");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentCreateDto = req.body;
    try {
        const data = yield services_1.commentService.createComment(commentCreateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentUpdateDto = req.body;
    const commentId = req.query.commentId;
    try {
        const data = yield services_1.commentService.updateComment(commentId, commentUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const updateCommentTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentUpdateDto = req.body;
    const { commentId } = req.params;
    try {
        const data = yield services_1.commentService.updateCommentTree(commentId, commentUpdateDto);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const data = yield services_1.commentService.findPostById(postId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findCommentTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const data = yield services_1.commentService.findCommentTree(postId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findCommentAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.commentService.findCommentAll();
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.query.commentId;
    try {
        const data = yield services_1.commentService.deleteComment(commentId);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.DELETE_UNIT_TITLE_SUCCESS, data));
    }
    catch (error) {
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    createComment,
    updateComment,
    updateCommentTree,
    findPostById,
    findCommentTree,
    findCommentAll,
    deleteComment,
};
//# sourceMappingURL=commentController.js.map
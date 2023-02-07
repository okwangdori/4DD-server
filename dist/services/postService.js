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
const Post_1 = __importDefault(require("../models/Post"));
const moment_1 = __importDefault(require("moment"));
const createPost = (postCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // create를 위해 각 filed명에 값들을 할당시켜준다.
        const post = new Post_1.default({
            userName: postCreateDto.userName,
            title: postCreateDto.title,
            content: postCreateDto.content,
            dateTimeOfPosting: (0, moment_1.default)().format("YYYY-MM-DD hh:mm:ss"),
            additional: {
                category: (_a = postCreateDto.additional) === null || _a === void 0 ? void 0 : _a.category,
                season: (_b = postCreateDto.additional) === null || _b === void 0 ? void 0 : _b.season,
            }
        });
        yield post.save();
        const data = {
            _id: post.id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updatePost = (postId, postUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post_1.default.findByIdAndUpdate(postId, postUpdateDto); // update 로직
        const post = yield findPostById(postId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
        if (!post) {
            return null;
        }
        return post;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(postId);
        if (!post) {
            return null;
        }
        return post;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find();
        if (!posts) {
            return null;
        }
        return posts;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findByIdAndDelete(postId);
        if (!post) {
            return null;
        }
        return post;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createPost,
    updatePost,
    findPostById,
    getPosts,
    deletePost
};
//# sourceMappingURL=postService.js.map
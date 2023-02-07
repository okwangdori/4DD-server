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
const logger_1 = __importDefault(require("../log/logger"));
const Comment_1 = __importDefault(require("../models/Comment"));
const moment_1 = __importDefault(require("moment"));
const createComment = (commentCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // create를 위해 각 filed명에 값들을 할당시켜준다.
        const comment = new Comment_1.default({
            post_id: commentCreateDto.post_id,
            userName: commentCreateDto.userName,
            content: commentCreateDto.content,
            comment_level: commentCreateDto.comment_level,
            parentsComment: commentCreateDto === null || commentCreateDto === void 0 ? void 0 : commentCreateDto.parentsComment,
            dateTimeOfComment: (0, moment_1.default)().format("YYYY-MM-DD hh:mm:ss"),
            parent: commentCreateDto === null || commentCreateDto === void 0 ? void 0 : commentCreateDto.parent,
            children: commentCreateDto === null || commentCreateDto === void 0 ? void 0 : commentCreateDto.children,
        });
        yield comment.save();
        const data = {
            _id: comment.id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updateComment = (commentId, commentUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Comment_1.default.findByIdAndUpdate(commentId, commentUpdateDto); // update 로직
        const comment = yield findPostById(commentId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
        if (!comment) {
            return null;
        }
        return comment;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const findPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.find({ post_id: postId });
        if (!comment) {
            return null;
        }
        return comment;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
let bulkArr = [];
const getChildId = (list, useYN) => {
    list.map((v, i) => {
        bulkArr.push({
            updateOne: {
                filter: { _id: v._id },
                update: { $set: { useYN: useYN } },
            },
        });
        if (v.childComment.length > 0) {
            getChildId(v.childComment, useYN);
        }
    });
};
const updateCommentTree = (commentId, commentUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        getChildId([commentUpdateDto.selectedComment], commentUpdateDto.content);
        yield Comment_1.default.bulkWrite(bulkArr);
        const comment = yield findPostById(commentId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
        if (!comment) {
            return null;
        }
        return comment;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const findCommentTree = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.aggregate([
            { $match: { post_id: (postId) } },
            {
                $graphLookup: {
                    from: "comments",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentsComment",
                    depthField: "level",
                    as: "childComment",
                },
            },
            {
                $unwind: {
                    path: "$childComment",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $sort: {
                    "childComment.dateTimeOfComment": 1,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    post_id: { $first: "$post_id" },
                    userName: { $first: "$userName" },
                    content: { $first: "$content" },
                    dateTimeOfComment: { $first: "$dateTimeOfComment" },
                    parentsComment: { $first: "$parentsComment" },
                    isDeleted: { $first: "$isDeleted" },
                    childComment: {
                        $push: {
                            _id: "$childComment._id",
                            post_id: "$childComment.post_id",
                            userName: "$childComment.userName",
                            content: "$childComment.content",
                            dateTimeOfComment: "$childComment.dateTimeOfComment",
                            parentsComment: "$childComment.parentsComment",
                            isDeleted: "$childComment.isDeleted",
                        },
                    },
                },
            },
            {
                $addFields: {
                    childComment: {
                        $reduce: {
                            input: "$childComment",
                            initialValue: {
                                level: -1,
                                presentChild: [],
                                prevChild: [],
                            },
                            in: {
                                $let: {
                                    vars: {
                                        prev: {
                                            $cond: [
                                                { $eq: ["$$value.level", "$$this.level"] },
                                                "$$value.prevChild",
                                                "$$value.presentChild",
                                            ],
                                        },
                                        current: {
                                            $cond: [
                                                { $eq: ["$$value.level", "$$this.level"] },
                                                "$$value.presentChild",
                                                [],
                                            ],
                                        },
                                    },
                                    in: {
                                        level: "$$this.level",
                                        prevChild: "$$prev",
                                        presentChild: {
                                            $concatArrays: [
                                                "$$current",
                                                [
                                                    {
                                                        _id: "$$this._id",
                                                        post_id: "$$this.post_id",
                                                        userName: "$$this.userName",
                                                        content: "$$this.content",
                                                        dateTimeOfComment: "$$this.dateTimeOfComment",
                                                        parentsComment: "$$this.parentsComment",
                                                        isDeleted: "$$this.isDeleted",
                                                        level: "$$this.level",
                                                        childComment: {
                                                            $filter: {
                                                                input: "$$prev",
                                                                as: "e",
                                                                cond: {
                                                                    $eq: [
                                                                        "$$e.parentsComment",
                                                                        "$$this._id",
                                                                    ],
                                                                },
                                                            },
                                                        },
                                                    },
                                                ],
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            { $addFields: { childComment: "$childComment.presentChild" } },
            { $sort: { dateTimeOfComment: 1 } },
        ]);
        if (!comment) {
            return null;
        }
        return comment;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const findCommentAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let comment = yield Comment_1.default.find({ comment_level: 0 })
            .populate("parentsComment")
            .sort({ dateTimeOfCommentCreating: -1 })
            .exec();
        //오브젝트용 가공 샘플
        // interface ObjType {
        //     [key: string]: any[]
        // }
        // let obj : ObjType = {};
        let list = [];
        if (!comment) {
            return null;
        }
        else {
            comment.map((e, i) => {
                if (list[i]) {
                    list[i].push(e);
                }
                else {
                    list[i] = [];
                    list[i].push(e);
                }
                //오브젝트용 가공 샘플
                // if(obj[e.additional.category]) {
                //     obj[e.additional.category].push(e);
                // }else{
                //     obj[e.additional.category] = [];
                //     obj[e.additional.category].push(e);
                // }
            });
        }
        return list;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findByIdAndUpdate(commentId, { isDeleted: true });
        // const comment = await Comment.findByIdAndRemove(commentId);  // 삭제용
        if (!comment) {
            return null;
        }
        return comment;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.default = {
    createComment,
    updateComment,
    findPostById,
    updateCommentTree,
    findCommentTree,
    findCommentAll,
    deleteComment,
};
//# sourceMappingURL=commentService.js.map
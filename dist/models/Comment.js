"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const CommentSchema = new Schema({
    // post: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post',
    //     require: true,
    // },
    post_id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    content: {
        type: String
    },
    comment_level: {
        type: Number,
        required: true,
        default: 1
    },
    parentsComment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    dateTimeOfComment: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });
CommentSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentsComment',
});
// CommentSchema
//   .virtual('childComments')
//   .get(function () {
//     return this._childComments;
//   })
//   .set(function (v) {
//     this._childComments = v;
// });
// CommentSchema.virtual('child').get(function () {
//     return this.child;
// }).set(function (v) {
//     this.child = v;
// });
exports.default = mongoose_1.default.model("Comment", CommentSchema);
//# sourceMappingURL=Comment.js.map
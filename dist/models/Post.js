"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    dateTimeOfPosting: {
        type: Date,
        required: true,
        default: Date.now,
    },
    additional: {
        category: { type: String },
        season: { type: String },
    },
});
exports.default = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=Post.js.map
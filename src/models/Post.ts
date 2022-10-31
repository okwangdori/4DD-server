import mongoose from "mongoose";
import { postInfo } from "../interfaces/post/postInfo";

const PostSchema = new mongoose.Schema({
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

export default mongoose.model<postInfo & mongoose.Document>("Post", PostSchema);
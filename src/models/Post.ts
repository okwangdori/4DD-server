import mongoose from "mongoose";
import { postInfoDto } from "../interfaces/post/postInfoDto";

const PostSchema = new mongoose.Schema({
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

export default mongoose.model<postInfoDto & mongoose.Document>("Post", PostSchema);
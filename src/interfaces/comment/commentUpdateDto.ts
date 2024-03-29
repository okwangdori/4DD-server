import mongoose from "mongoose";

export interface commentUpdateDto {
    _id: mongoose.Schema.Types.ObjectId;
    post_id?: string;
    userName?: string;
    content?: string;
    comment_level?: number;
    parentsComment?: mongoose.Schema.Types.ObjectId;
    dateTimeOfPosting?: Date;
    isDelete: string;
    parent?: mongoose.Schema.Types.ObjectId;
    children?: [mongoose.Schema.Types.ObjectId];
    selectedComment?: string;
}
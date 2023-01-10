import mongoose from "mongoose";

export interface commentCreateDto {
    post_id: string;
    userName: string;
    content: string;
    comment_level : number;
    parentsComment?: mongoose.Schema.Types.ObjectId;
    dateTimeOfPosting?: Date;
    parent?: mongoose.Schema.Types.ObjectId;
    children?: [mongoose.Schema.Types.ObjectId];
}
import mongoose from "mongoose";

export interface commentInfoDto {
    post_id: string;
    userName: string;
    content: string;
    comment_level : number;
    comment_id: string;
    parents_comment_id: string;
    dateTimeOfPosting?: Date;
    parent : mongoose.Schema.Types.ObjectId;
    children: [mongoose.Schema.Types.ObjectId];
}
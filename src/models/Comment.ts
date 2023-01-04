import mongoose from "mongoose";
import { commentInfoDto } from "../interfaces/comment/commentInfoDto";

const { Schema } = mongoose;

const CommentSchema = new Schema({
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
        comment_level : {
            type: Number,
            required: true,
            default: 1
        },
        comment_id: {
            type: String
        },
        parents_comment_id: {
            type: String
        },
        dateTimeOfComment: {
            type: Date,
            required: true,
            default: Date.now,
        },
        parent : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
        
        children : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

CommentSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parent',
});
  
// CommentSchema.virtual('child').get(function () {
//     return this.child;
// }).set(function (v) {
//     this.child = v;
// });
  

export default mongoose.model<commentInfoDto & mongoose.Document>("Comment", CommentSchema);
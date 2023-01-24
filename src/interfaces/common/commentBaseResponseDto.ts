// interfaces/common/CommentBaseResponseDto.ts -> id만 노출할 때
import mongoose from "mongoose";

export interface commentBaseResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
}
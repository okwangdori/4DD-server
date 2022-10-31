// interfaces/common/PostBaseResponseDto.ts -> id만 노출할 때
import mongoose from "mongoose";

export interface postBaseResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
}
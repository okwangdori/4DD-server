// interfaces/common/UserBaseResponseDto.ts -> id만 노출할 때
import mongoose from "mongoose";

export interface userBaseResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
}
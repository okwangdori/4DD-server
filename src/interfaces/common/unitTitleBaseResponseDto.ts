// interfaces/common/unitTitleBaseResponseDto.ts -> id만 노출할 때
import mongoose from "mongoose";

export interface unitTitleBaseResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
}
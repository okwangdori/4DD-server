// interfaces/post/PostResponseDto.ts -> 정보 조회 용
import mongoose from "mongoose";
import { commentCreateDto } from "./commentCreateDto";

export interface commentResponseDto extends commentCreateDto { // commentCreateDto 를 상속받아 확장시킨다.
    _id: mongoose.Schema.Types.ObjectId;
}
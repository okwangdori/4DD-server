// interfaces/post/PostResponseDto.ts -> 정보 조회 용
import mongoose from "mongoose";
import { postCreateDto } from "./postCreateDto";

export interface postResponseDto extends postCreateDto { // postCreateDto 를 상속받아 확장시킨다.
    _id: mongoose.Schema.Types.ObjectId;
}
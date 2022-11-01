// interfaces/unitTitle/unitTitleResponseDto.ts -> 정보 조회 용
import mongoose from "mongoose";
import { unitTitleCreateDto } from "./unitTitleCreateDto";

export interface unitTitleResponseDto extends unitTitleCreateDto { // postCreateDto 를 상속받아 확장시킨다.
    _id: mongoose.Schema.Types.ObjectId;
}
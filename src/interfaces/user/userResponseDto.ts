// interfaces/user/UserResponseDto.ts -> 정보 조회 용
import mongoose from "mongoose";
import { userCreateDto } from "./userCreateDto";

export interface userResponseDto extends userCreateDto { // userCreateDto 를 상속받아 확장시킨다.
    _id: mongoose.Schema.Types.ObjectId;
}
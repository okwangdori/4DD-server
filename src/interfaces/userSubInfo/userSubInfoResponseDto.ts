// interfaces/user/UserResponseDto.ts -> 정보 조회 용
import mongoose from "mongoose";
import { userSubInfoCreateDto } from "./userSubInfoCreateDto";

export interface userSubInfoResponseDto extends userSubInfoCreateDto {
  _id: mongoose.Schema.Types.ObjectId;
}

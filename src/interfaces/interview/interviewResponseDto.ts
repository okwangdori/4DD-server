import mongoose from "mongoose";
import { interviewCreateDto } from "./interviewCreateDto";

export interface interviewResponseDto extends interviewCreateDto {
  _id: mongoose.Schema.Types.ObjectId;
}

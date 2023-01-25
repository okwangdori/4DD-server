import mongoose from "mongoose";
import { unitDetailCreateDto } from "./unitDetailCreateDto";

export interface unitDetailResponseDto extends unitDetailCreateDto {
  _id: mongoose.Schema.Types.ObjectId;
}

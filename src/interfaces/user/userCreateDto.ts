import mongoose from "mongoose";

// interfaces/user/UserCreateDto.ts -> create 용
export interface userCreateDto {
  name?: string;
  email?: string;
  password?: string;
  user_sub_info?: mongoose.Schema.Types.ObjectId;
}

import mongoose from "mongoose";

// interfaces/user/UserInfo.ts -> model 정의 용도
export interface userInfoDto {
  name?: string;
  email?: string;
  user_sub_info: mongoose.Schema.Types.ObjectId;
}

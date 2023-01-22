import mongoose from "mongoose";
import { userCreateDto } from "../interfaces/user/userCreateDto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //유저 회원가입 중 user생성하기 전에 userSubInfo 먼저 생성 후 생성된 userSubInfo의 아이디를 가져와서 저장
  user_sub_info: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserSubInfo",
  },
});

export default mongoose.model<userCreateDto & mongoose.Document>(
  "User",
  UserSchema
);

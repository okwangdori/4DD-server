// interfaces/user/UserUpdateDto.ts -> update 용
import mongoose from "mongoose";

export interface userUpdateDto {
    _id: mongoose.Schema.Types.ObjectId;
    email?: string;
    password?: string;
}
import mongoose from "mongoose";
import { userInfo } from "../interfaces/user/userInfo";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model<userInfo & mongoose.Document>("User", UserSchema);
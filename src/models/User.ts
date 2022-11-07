import mongoose from "mongoose";
import { userCreateDto } from "../interfaces/user/userCreateDto";

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

export default mongoose.model<userCreateDto & mongoose.Document>("User", UserSchema);
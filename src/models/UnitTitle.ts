import mongoose from "mongoose";
import { unitTitleInfo } from "../interfaces/unitTitle/unitTitleInfo";

const UnitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    dateTimeOfUnitTitleCreating: {
        type: Date,
        required: true,
        default: Date.now,
    },
    additional: {
        category: { type: String },
        category_number: { type: Number },
    },
});

export default mongoose.model<unitTitleInfo & mongoose.Document>("UnitTitle", UnitSchema);
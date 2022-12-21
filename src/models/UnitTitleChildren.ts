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
    category: {
        type: String,
        required: true,
    },
    category_number: {
        type: Number,
        required: true,
    },
    menu_level : {
        type: Number,
        required: true,
    },
    menu_id: {
        type: String,
        required: true,
    },
    parents_menu_id : {
        type: String,
        required: true,
    },
    useYN : {
        type: String,
        required: true,
    },
    dateTimeOfUnitTitleCreating: {
        type: Date,
        required: true,
        default: Date.now,
    },
    children_id: [
        "637a01f25f8f764389c5bdaa"
    ],
});

export default mongoose.model<unitTitleInfo & mongoose.Document>("UnitTitle", UnitSchema);
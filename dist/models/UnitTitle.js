"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UnitSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UnitDetail",
    },
    category: {
        type: String,
        required: true,
    },
    category_number: {
        type: Number,
        required: true,
    },
    parent_unit_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    menu_level: {
        type: Number,
        required: true,
        default: 1,
    },
    useYN: {
        type: String,
        required: true,
        default: "Y",
    },
    title_image_path: {
        type: String,
        required: true,
    },
    dateTimeOfUnitTitleCreating: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });
UnitSchema.virtual("unitTitles", {
    ref: "UnitTitle",
    localField: "_id",
    foreignField: "parent",
});
exports.default = mongoose_1.default.model("UnitTitle", UnitSchema);
//# sourceMappingURL=UnitTitle.js.map
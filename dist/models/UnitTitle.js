"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UnitSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("UnitTitle", UnitSchema);
//# sourceMappingURL=UnitTitle.js.map
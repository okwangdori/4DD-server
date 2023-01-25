"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UnitDetailSchema = new mongoose_1.default.Schema({
    parent_title_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UnitTitle",
    },
    title: {
        type: String,
        required: true,
    },
    detail_content: {
        type: String,
        required: true,
    },
    useYN: {
        type: String,
        required: true,
        default: "Y",
    },
    dateTimeOfPosting: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("UnitDetail", UnitDetailSchema);
//# sourceMappingURL=UnitDetail.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose_1.default);
const { Schema } = mongoose_1.default;
const InterviewSchema = new Schema({
    // sequence_number: {
    // },
    main_category: {
        type: String,
        required: true,
    },
    main_category_code: {
        type: Number,
        required: true,
    },
    middle_category: {
        type: String,
        required: true,
    },
    middle_category_code: {
        type: Number,
        required: true,
    },
    sub_category: {
        type: String,
        required: true,
    },
    sub_category_code: {
        type: Number,
        required: true,
    },
    multiple_choice: {
        type: Boolean,
        required: true,
    },
    interview_contents: {
        type: String,
        required: true,
    },
    interview_answer: {
        type: String,
        required: true,
    },
    answer_example: {
        type: Array,
        required: true,
    },
    writer: {
        type: String,
        require: true,
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
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });
InterviewSchema.virtual("interviews", {
    ref: "Interview",
    localField: "_id",
    foreignField: "parent",
});
InterviewSchema.plugin(AutoIncrement, { inc_field: "sequence_number" });
exports.default = mongoose_1.default.model("Interview", InterviewSchema);
//# sourceMappingURL=Interview.js.map
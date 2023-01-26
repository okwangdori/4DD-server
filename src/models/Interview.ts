import mongoose from "mongoose";
import { interviewInfo } from "../interfaces/interview/interviewInfo";

const { Schema } = mongoose;

const InterviewSchema = new Schema(
  {
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
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

InterviewSchema.virtual("interviews", {
  ref: "Interview",
  localField: "_id",
  foreignField: "parent",
});

export default mongoose.model<interviewInfo & mongoose.Document>(
  "Interview",
  InterviewSchema
);

import mongoose from "mongoose";
import { unitTitleInfo } from "../interfaces/unitTitle/unitTitleInfo";

const { Schema } = mongoose;

const UnitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
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
    menu_level: {
      type: Number,
      required: true,
      default: 1,
    },
    menu_id: {
      type: String,
      required: true,
    },
    parents_menu_id: {
      type: String,
      required: true,
    },
    useYN: {
      type: String,
      required: true,
      default: "Y",
    },
    dateTimeOfUnitTitleCreating: {
      type: Date,
      required: true,
      default: Date.now,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnitTitle",
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

UnitSchema.virtual("unitTitles", {
  ref: "UnitTitle",
  localField: "_id",
  foreignField: "parent",
});

export default mongoose.model<unitTitleInfo & mongoose.Document>(
  "UnitTitle",
  UnitSchema
);

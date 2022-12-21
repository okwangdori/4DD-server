// import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { unitTitleInfo } from "../interfaces/unitTitle/unitTitleInfo";
import user from "./user";
// import UnitTitleChildren from "./UnitTitleChildren";

const { Schema } = mongoose;

// const {Types : { ObjectId }} = Schema;

const UnitSchema = new Schema({
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
            default: 1
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
            default: "Y"
        },
        dateTimeOfUnitTitleCreating: {
            type: Date,
            required: true,
            default: Date.now,
        },
        parent : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UnitTitle"
        },
        
        children : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UnitTitle"
        }]
    },
    { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

UnitSchema.virtual('unitTitles', {
    ref: 'UnitTitle',
    localField: '_id',
    foreignField: 'parent',
});
  
// UnitSchema.virtual('child').get(function () {
//     return this.child;
// }).set(function (v) {
//     this.child = v;
// });
  

export default mongoose.model<unitTitleInfo & mongoose.Document>("UnitTitle", UnitSchema);
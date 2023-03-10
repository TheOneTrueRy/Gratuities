import { Schema } from "mongoose";


export const TipSchema = new Schema({
    giverId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    receiverId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    tip: { type: Number, required: true, min: 0.01 },
    isOpened: { type: Boolean, default: false },
    isPayedOut: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { virtuals: true } })

TipSchema.virtual('giver', {
    localField: "giverId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})
TipSchema.virtual('receiver', {
    localField: "receiverId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})
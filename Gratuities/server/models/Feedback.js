import { Schema } from "mongoose";

export const FeedbackSchema = new Schema({
    giverId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    receiverId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    chatId: {type: Schema.Types.ObjectId, required: true, ref: "Chat"},
    body: { type: String, required: true, maxLength: 200, minLength: 1 },
    isOpened: { type: Boolean, default: false }
},
    { timestamps: true, toJSON: { virtuals: true } })

FeedbackSchema.virtual('giver', {
    localField: "giverId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})

FeedbackSchema.virtual('receiver', {
    localField: "receiverId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})
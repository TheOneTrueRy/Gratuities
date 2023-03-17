import { Schema } from "mongoose";


export const ChatSchema = new Schema({
    // the one who started the chat
    starterId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    // the one who got the chat
    receiverId: { type: Schema.Types.ObjectId, required: true, ref: "Account"}
},
    { timestamps: true, toJSON: { virtuals: true } })

ChatSchema.virtual('starter', {
    localField: "starterId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})
ChatSchema.virtual('receiver', {
    localField: "receiverId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})
import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Borrow is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, " Quantity must be at lest 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer and positive"
        }
    },
    dueDate: {
        type: Date,
        required: [true, "DueDate is required"]
    }
}, {
    timestamps: true,
    versionKey: false
});




export const Borrow = model<IBorrow>("Borrow", borrowSchema);
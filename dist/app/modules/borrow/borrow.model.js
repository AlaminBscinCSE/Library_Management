"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);

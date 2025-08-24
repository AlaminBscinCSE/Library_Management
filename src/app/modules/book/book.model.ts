import { model, Schema } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        genre: {
            type: String,
            required: [true, "Genre is required"],
            enum: {
                values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
                message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
            },
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        copies: {
            type: Number,
            required: [true, "Copies is required"],
            min: [0, "Copies must be a positive number"],
            validate: {
                validator: Number.isInteger,
                message: "Copies must be an integer",
            },
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

bookSchema.statics.updateAvailability = async function (id: string) {

    const book = await this.findById(id);

    //only for savingJon i know no need !book return  for this project
    if (!book) return;

    if (book.copies === 0) {
        book.available = false;
        await book.save();
    } else {
        book.available = true;
        await book.save();
    }
};

export const Book = model<IBook, BookModel>("Book", bookSchema);
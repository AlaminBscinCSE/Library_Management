import { Request, Response } from "express";
import { Book } from "./book.model";
import { zodBookSchema } from "./zodValidation";

const createBook = async (req: Request, res: Response) => {
    try {
        //  const body = req.body
        const body = zodBookSchema.parse(req.body);
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
};
const getBooks = async (req: Request, res: Response) => {
    try {


        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;

        const query: any = {};

        if (filter) {
            query.genre = filter as string;
        }

        const books = await Book.find(query)
            .sort({ [sortBy as string]: sort as string === "desc" ? -1 : 1 })
            .limit(Number(limit));

        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Books getting something wrong",
            error
        });
    }
};
const getSingleBook = async (req: Request, res: Response) => {

    try {
        const book_Id = req.params.bookId;
        const book = await Book.findById(book_Id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }

        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Book getting something wrong",
            error
        });
    }
};
const updateSingleBook = async (req: Request, res: Response) => {

    try {
        const book_Id = req.params.bookId;
        const book = await Book.findByIdAndUpdate(book_Id, req.body, { new: true });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }

        res.json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Update book something wrong",
            error
        });
    }
};
const deleteSingleBook = async (req: Request, res: Response) => {

    try {
        const book_Id = req.params.bookId;
        const book = await Book.findOneAndDelete({ _id: book_Id });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }

        res.json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Delete book something wrong",
            error
        });
    }
};




export const bookController = {
    createBook,
    getBooks,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook
};

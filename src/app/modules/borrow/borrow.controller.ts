import { Request, Response } from "express";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

const createBorrow = async (req: Request, res: Response) => {
    try {
        const { book, quantity } = req.body;
        const findBook = await Book.findById(book);

        if (!findBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }

        if (findBook.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only book copies are available ${findBook.copies} pice`
            });
        }
        //Deduct the requested quantity from the book’s copies.
        findBook.copies -= quantity;

        // if (findBook.copies == 0) {
        //     findBook.available = false
        // } 


        await findBook.save();
        Book.updateAvailability(book as string);

        const borrow = await Borrow.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });

    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
};

const getAllBorrowBooks = async (req: Request, res: Response) => {
    try {
        const borrow = await Borrow.aggregate([
            //stage 01
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                }
            },
            // stage 02
            {
                $lookup:
                {
                    from: "books",
                    localField: "_id",
                    // 1st time my localField name was book but after made group became _id 
                    foreignField: "_id",
                    as: "book"
                }
            },
            //stage 03
            { $unwind: "$book" }, //need for {...book}

            //stage 04
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1

                }
            }

        ]);

        res.json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrow
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Get all borrow books something wrong",
            error
        });
    }
};


export const borrowController = {
    createBorrow,
    getAllBorrowBooks,
};
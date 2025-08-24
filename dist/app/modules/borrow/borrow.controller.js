"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity } = req.body;
        const findBook = yield book_model_1.Book.findById(book);
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
        yield findBook.save();
        book_model_1.Book.updateAvailability(book);
        const borrow = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
const getAllBorrowBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrow_model_1.Borrow.aggregate([
            //stage 01
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                }
            },
            // stage 02
            {
                $lookup: {
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
    }
    catch (error) {
        res.json({
            success: false,
            message: "Get all borrow books something wrong",
            error
        });
    }
});
exports.borrowController = {
    createBorrow,
    getAllBorrowBooks,
};

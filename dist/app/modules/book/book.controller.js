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
exports.bookController = void 0;
const book_model_1 = require("./book.model");
const zodValidation_1 = require("./zodValidation");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  const body = req.body
        const body = zodValidation_1.zodBookSchema.parse(req.body);
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
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
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Books getting something wrong",
            error
        });
    }
});
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book_Id = req.params.bookId;
        const book = yield book_model_1.Book.findById(book_Id);
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
    }
    catch (error) {
        res.json({
            success: false,
            message: "Book getting something wrong",
            error
        });
    }
});
const updateSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book_Id = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndUpdate(book_Id, req.body, { new: true });
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
    }
    catch (error) {
        res.json({
            success: false,
            message: "Update book something wrong",
            error
        });
    }
});
const deleteSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book_Id = req.params.bookId;
        const book = yield book_model_1.Book.findOneAndDelete({ _id: book_Id });
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
    }
    catch (error) {
        res.json({
            success: false,
            message: "Delete book something wrong",
            error
        });
    }
});
exports.bookController = {
    createBook,
    getBooks,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook
};

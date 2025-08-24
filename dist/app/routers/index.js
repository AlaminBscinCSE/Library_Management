"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_router_1 = __importDefault(require("../modules/book/book.router"));
const borrow_router_1 = __importDefault(require("../modules/borrow/borrow.router"));
const routers = (0, express_1.Router)();
routers.use("/api/books", book_router_1.default);
routers.use("/api/borrow", borrow_router_1.default);
exports.default = routers;

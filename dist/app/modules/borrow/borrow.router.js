"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const borrowRouter = (0, express_1.Router)();
borrowRouter.post("/", (borrow_controller_1.borrowController.createBorrow));
borrowRouter.get("/", (borrow_controller_1.borrowController.getAllBorrowBooks));
exports.default = borrowRouter;

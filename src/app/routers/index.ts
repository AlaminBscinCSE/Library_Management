import { Router } from "express";
import bookRouter from "../modules/book/book.router";
import borrowRouter from "../modules/borrow/borrow.router";

const routers = Router();

routers.use("/api/books", bookRouter);
routers.use("/api/borrow", borrowRouter);

export default routers;  
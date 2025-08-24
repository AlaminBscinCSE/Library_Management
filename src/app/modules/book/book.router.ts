import { Router } from "express";
import { bookController } from "./book.controller";


const bookRouter = Router();

bookRouter.post("/", (bookController.createBook));
bookRouter.get("/", (bookController.getBooks));
bookRouter.get("/:bookId", (bookController.getSingleBook));
bookRouter.put("/:bookId", (bookController.updateSingleBook));
bookRouter.delete("/:bookId", (bookController.deleteSingleBook));


export default bookRouter;
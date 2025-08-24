import { Router } from "express";
import { borrowController } from "./borrow.controller";




const borrowRouter = Router();

borrowRouter.post("/", (borrowController.createBorrow));
borrowRouter.get("/", (borrowController.getAllBorrowBooks));



export default borrowRouter;
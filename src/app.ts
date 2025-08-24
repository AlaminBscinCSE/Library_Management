
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import routers from "./app/routers";



const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(routers);

app.get("/", (req: Request, res: Response) => {
    res.json({
        success: true,
        message: "Library_Management Server Running"
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
    next();
});

export default app;





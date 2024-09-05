import express, { Request, Response } from "express";

const productRouter = express.Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.send("Welcome to de product page");
});

export default productRouter;

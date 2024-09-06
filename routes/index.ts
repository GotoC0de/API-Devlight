import express from "express";
import productRouter from "../api/product/routes";
import userRouter from "../api/user/routes";
import cartRouter from "../api/cart/routes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);

export default router;

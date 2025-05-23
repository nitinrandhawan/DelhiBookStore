import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { createOrder, DeleteOrder, getAllOrders, GetOrderById, UpdateCheckout } from "../controllers/order.controller.js";

const router = Router();

router.get("/get-all-orders", verifyToken, getAllOrders);
router.get("/get-order/:id", GetOrderById);
router.post("/create-checkout",verifyToken, createOrder);
router.put("/update-order/:id", UpdateCheckout);
router.delete("/delete-order/:id", DeleteOrder);

export default router;
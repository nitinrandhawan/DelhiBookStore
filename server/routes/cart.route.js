import { Router } from "express";
import { AddToCart, getAllCarts, RemoveFromCart, UpdateQuantity } from "../controllers/cart.controller.js";

const router = Router();

router.get("/get-all-carts", getAllCarts);
router.post("/add-to-cart", AddToCart);
router.put("/update-cart", UpdateQuantity);
router.delete("/remove-from-cart", RemoveFromCart);

export default router;
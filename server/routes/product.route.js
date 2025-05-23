import express from "express"
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
import { multerErrorHandler } from "../middlewares/multerErrorHadler.middleware.js";
const router = express.Router();

router.post("/create-product",verifyAdmin,upload.array("images"),multerErrorHandler,createProduct)
router.post("/update-product/:id",verifyAdmin,upload.array("images"),multerErrorHandler,updateProduct)
router.get("/get-all-products",getAllProducts)
router.get("/get-product/:id",getSingleProduct)
router.delete("/delete-product/:id",verifyAdmin,deleteProduct)

export default router
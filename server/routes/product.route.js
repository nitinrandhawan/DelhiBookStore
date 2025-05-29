import express from "express"
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, multipleProducts, updateProduct } from "../controllers/product.controller.js";
import { multerErrorHandler } from "../middlewares/multerErrorHadler.middleware.js";
const router = express.Router();

router.post("/create-product",verifyAdmin,upload.array("images",5),multerErrorHandler,createProduct)
router.post("/multiple-product",verifyAdmin,multipleProducts)
router.put("/update-product/:id",verifyAdmin,upload.array("images",5),multerErrorHandler,updateProduct)
router.get("/get-all-products",getAllProducts)
router.get("/get-product/:id",getSingleProduct)
router.delete("/delete-product/:id",verifyAdmin,deleteProduct)

export default router
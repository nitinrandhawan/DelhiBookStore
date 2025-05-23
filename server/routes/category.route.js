import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import { multerErrorHandler } from "../middlewares/multerErrorHadler.middleware.js";

const router = express.Router();

router.post("/create-category", verifyAdmin, upload.fields([{ name: "image", maxCount: 1 },{name:"levelImage",maxCount:1}]), multerErrorHandler,createCategory);
router.get("/get-all-categories", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/update-category/:id", verifyAdmin, upload.single("image"),upload.fields([{ name: "image", maxCount: 1 },{name:"levelImage",maxCount:1}]), multerErrorHandler,updateCategory);
router.delete("/delete-category/:id", verifyAdmin, deleteCategory);

export default router;

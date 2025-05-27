import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName, level, isActive } = req.body;

    if (!categoryName ) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const localPath = req.files?.["image"]?.[0]?.path;
    if(!localPath){
      return res.status(400).json({ message: "Image is required" });
    }
    const imageUrl = await uploadOnCloudinary(localPath);

    if (!imageUrl){
      return res.status(500).json({ message: "Image upload failed" });
    }
    let levelImageUrl;
    if (isActive && level) {
      const levelImageLocalPath = req.files?.["levelImage"]?.[0]?.path;
      levelImageUrl = await uploadOnCloudinary(levelImageLocalPath);
      if (!levelImageUrl)
        return res.status(500).json({ message: "Image upload failed" });
    }
    const newCategory = await Category.create({
      categoryName,
      categoryImage: imageUrl,
      level,
      isActive,
      levelImage: levelImageUrl,
    });

    return res
      .status(201)
      .json({ message: "Category created", category: newCategory });
  } catch (error) {
    console.error("Create Category Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error in create category" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Get All Categories Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error in get all categories" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    return res.status(200).json(category);
  } catch (error) {
    console.error("Get Category by ID Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    console.log("req.body", req.body);
    
    const { categoryName, level, isActive } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (req.files?.["image"]?.[0]?.path) {
      const localPath = req.files?.["image"]?.[0]?.path;
      const imageUrl = await uploadOnCloudinary(localPath);
      if (imageUrl) category.categoryImage = imageUrl;
    } else {
      category.categoryImage = category.categoryImage;
    }

    if(req.files?.["levelImage"]?.[0]?.path && isActive && level) {
      const levelImageLocalPath = req.files?.["levelImage"]?.[0]?.path;
      const levelImageUrl = await uploadOnCloudinary(levelImageLocalPath);
      if (levelImageUrl) category.levelImage = levelImageUrl;
    } else {
      category.levelImage = category.levelImage;
    }
    category.categoryName = categoryName ?? category.categoryName;
    category.level = level ?? category.level;
    category.isActive = isActive ?? category.isActive;

    await category.save();
    return res.status(200).json({ message: "Category updated", category });
  } catch (error) {
    console.error("Update Category Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error in update category" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error in delete category" });
  }
};

export const getProductByCategory=async(req,res)=>{
  try {
   
    const category = await Product.find({category:req.params.id})
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    return res.status(200).json(category);
  } catch (error) {
    console.error("Get Category by ID Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
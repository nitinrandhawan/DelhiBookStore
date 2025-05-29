import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      highlights,
      details,
      author,
      pages,
      ISBN,
      publisher,
      publicationDate,
      language,
      newArrival,
      featuredBooks,
      bestSellingBooks,
      priceInDollors,
      priceInEuros,
      price,
      discount,
      category,
      stock,
    } = req.body || {};
    const errorMessages = [];
    if (!title) errorMessages.push("title is required");
    if (req.files.length == 0 || !req.files)
      errorMessages.push("image is required");
    if (!description) errorMessages.push("description is required");
    if (!highlights) errorMessages.push("highlights is required");
    if (!details) errorMessages.push("details is required");
    if (!author) errorMessages.push("author is required");
    if (!pages) errorMessages.push("pages is required");
    if (!ISBN) errorMessages.push("ISBN is required");
    if (!publisher) errorMessages.push("publisher is required");
    if (!publicationDate) errorMessages.push("publicationDate is required");
    if (!Array.isArray(language)) errorMessages.push("language is required");
    if (!priceInDollors) errorMessages.push("priceInDollors is required");
    if (!priceInEuros) errorMessages.push("priceInEuros is required");
    if (!price) errorMessages.push("price is required");
    if (!discount) errorMessages.push("discount is required");
    if (!category) errorMessages.push("category is required");
    if (!stock) errorMessages.push("stock is required");
    if (errorMessages.length > 0) {
      return res.status(400).json({ message: errorMessages });
    }
    const newArrivalBool = newArrival === "true";
    const featuredBooksBool = featuredBooks === "true";
    const bestSellingBooksBool = bestSellingBooks === "true";

    const isCategoryExists = await Category.findById(category);

    if (!isCategoryExists) {
      return res.status(400).json({ message: "category not found" });
    }

    const imagesPromises = req.files.map((file) => {
      let localPath = file.path;
      return uploadOnCloudinary(localPath);
    });
    const images = await Promise.all(imagesPromises);
    const finalPrice = Number(price) - (Number(price) * Number(discount)) / 100;

    const product = await Product.create({
      title,
      description,
      highlights,
      details,
      author,
      pages,
      ISBN,
      publisher,
      publicationDate,
      language,
      newArrival: newArrivalBool,
      featuredBooks: featuredBooksBool,
      bestSellingBooks: bestSellingBooksBool,
      priceInDollors: Number(priceInDollors),
      priceInEuros: Number(priceInEuros),
      price: Number(price),
      discount: Number(discount),
      category,
      stock,
      images,
      finalPrice,
    });

    return res.status(201).json({ message: "product created", product });
  } catch (error) {
    console.log("create product error", error);
    return res.status(500).json({ message: "create product server error" });
  }
};

const multipleProducts = async (req, res) => {
  try {
    const { products } = req.body || {};
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }
  
    const updatedProducts = await Promise.all(products.map(async (product) => {
      if (product.images) {
        if (typeof product.images === "string") {
          product.images = [product.images];
        } else {
          product.images = [];
        }
        if (product.category) {
          const existedCategory = await Category.findOne({
            category: product.categoryName,
          });
          if (existedCategory) {
            product.category = existedCategory._id;
          }
        }
      }
      return product;
    }));
    console.log("updatedProducts", updatedProducts.slice(0, 5));
    
    const insertedProducts = await Product.insertMany(updatedProducts);

    return res
      .status(201)
      .json({ message: "Products created", products: insertedProducts });
  } catch (error) {
    console.log("create product error", error);
    return res.status(500).json({ message: "create product server error" , error});
  }
};
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      highlights,
      details,
      author,
      pages,
      ISBN,
      publisher,
      publicationDate,
      language,
      category,
    } = req.body || {};
    let priceInDollors = Number(req.body.priceInDollors);
    let priceInEuros = Number(req.body.priceInEuros);
    let price = Number(req.body.price);
    let stock = Number(req.body.stock);
    let discount = Number(req.body.discount);
    let newArrival = req.body.newArrival === "true";
    let featuredBooks = req.body.featuredBooks === "true";
    let bestSellingBooks = req.body.bestSellingBooks === "true";
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (req.files) {
      const imagesPromises = req.files.map((file) => {
        let localPath = file.path;
        uploadOnCloudinary(localPath);
      });
      const images = await Promise.all(imagesPromises);
      product.images = images;
    } else {
      product.images = product.images;
    }
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.highlights = highlights ?? product.highlights;
    product.details = details ?? product.details;
    product.author = author ?? product.author;
    product.pages = pages ?? product.pages;
    product.ISBN = ISBN ?? product.ISBN;
    product.publisher = publisher ?? product.publisher;
    product.publicationDate = publicationDate ?? product.publicationDate;
    product.language = language ?? product.language;
    product.newArrival = newArrival ?? product.newArrival;
    product.featuredBooks = featuredBooks ?? product.featuredBooks;
    product.bestSellingBooks = bestSellingBooks ?? product.bestSellingBooks;
    product.priceInDollors = priceInDollors ?? product.priceInDollors;
    product.priceInEuros = priceInEuros ?? product.priceInEuros;
    product.price = price ?? product.price;
    product.discount = discount ?? product.discount;
    if (category) {
      let isCategoryExists = await Category.findById(category);
      if (!isCategoryExists) {
        return res.status(400).json({ message: "category not found" });
      }
      product.category = category;
    } else {
      product.category = product.category;
    }
    product.stock = stock ?? product.stock;
    await product.save();
    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.log("update product error", error);
    return res.status(500).json({ message: "update product server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({})
      .populate("category")
      .skip(skip)
      .limit(limit);

    const totalCount = await Product.countDocuments();

    return res.status(200).json({
      message: "all products",
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.log("get all products error", error);
    return res.status(500).json({ message: "get all products server error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product found", product });
  } catch (error) {
    console.log("get single product error", error);
    return res.status(500).json({ message: "get single product server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    console.log("delete product error", error);
    return res.status(500).json({ message: "delete product server error" });
  }
};
export {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  multipleProducts,
};

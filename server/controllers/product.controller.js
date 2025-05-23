import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
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
    if (!title) return errorMessages.push("title is required");
    if (req.files.length == 0 || !req.files)
      return errorMessages.push("image is required");
    if (!description) return errorMessages.push("description is required");
    if (!highlights) return errorMessages.push("highlights is required");
    if (!details) return errorMessages.push("details is required");
    if (!author) return errorMessages.push("author is required");
    if (!pages) return errorMessages.push("pages is required");
    if (!ISBN) return errorMessages.push("ISBN is required");
    if (!publisher) return errorMessages.push("publisher is required");
    if (!publicationDate)
      return errorMessages.push("publicationDate is required");
    if (!language) return errorMessages.push("language is required");
    if (!newArrival) return errorMessages.push("newArrival is required");
    if (!featuredBooks) return errorMessages.push("featuredBooks is required");
    if (!bestSellingBooks)
      return errorMessages.push("bestSellingBooks is required");
    if (!priceInDollors)
      return errorMessages.push("priceInDollors is required");
    if (!priceInEuros) return errorMessages.push("priceInEuros is required");
    if (!price) return errorMessages.push("price is required");
    if (!discount) return errorMessages.push("discount is required");
    if (!category) return errorMessages.push("category is required");
    if (!stock) return errorMessages.push("stock is required");
    if (errorMessages.length > 0) {
      return res.status(400).json({ message: errorMessages });
    }

    const isCategoryExists = await Category.findById(category);

    if (!isCategoryExists) {
      return res.status(400).json({ message: "category not found" });
    }

    const imagesPromises = req.files.map((file) => {
      let localPath = file.path;
      uploadOnCloudinary(localPath);
    });
    const images = await Promise.all(imagesPromises);

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
      newArrival,
      featuredBooks,
      bestSellingBooks,
      priceInDollors,
      priceInEuros,
      price,
      discount,
      category,
      stock,
      images,
    });

    return res.status(201).json({ message: "product created", product });
  } catch (error) {
    console.log("create product error", error);
    return res.status(500).json({ message: "create product server error" });
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
  const product = await  Product.findById(req.params.id);
  if(!product) return res.status(404).json({message:"Product not found"});
    if(req.files){
      const imagesPromises = req.files.map((file) => {
        let localPath = file.path;
        uploadOnCloudinary(localPath);
      });
      const images = await Promise.all(imagesPromises);
     product.images = images;
    }else{
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
    if(category){
      let isCategoryExists =  await Category.findById(category);
      if (!isCategoryExists) {
        return res.status(400).json({ message: "category not found" });
      }
      product.category = category;
    }else{
      product.category = product.category;
    }
    product.stock = stock ?? product.stock;
    await product.save();
    return res.status(200).json({message:"Product updated",product});
  } catch (error) {
    console.log("update product error", error);
    return res.status(500).json({ message: "update product server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    return res.status(200).json({ message: "all products", products });
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
}
export { createProduct,updateProduct,getAllProducts,getSingleProduct,deleteProduct };

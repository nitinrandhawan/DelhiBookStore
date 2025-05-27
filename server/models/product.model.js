import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    highlights: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
    newArrival: {
      type: Boolean,
      required: true,
    },
    featuredBooks: {
      type: Boolean,
      required: true,
    },
    bestSellingBooks: {
      type: Boolean,
      required: true,
    },
    priceInDollors: {
      type: Number,
      required: true,
    },
    priceInEuros: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);

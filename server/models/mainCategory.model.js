import mongoose from "mongoose";

const mainCategorySchema = new mongoose.Schema({
  Parent_id: {
    type: String,
    required: true,
  },

  Parent_name: {
    type: String,
    required: true,
  },
});

export const MainCategory = mongoose.model("MainCategory", mainCategorySchema);

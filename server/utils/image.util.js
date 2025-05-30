import fs from "fs";
import path from "path";

 const deleteLocalImage = (imagePath) => {
  const fullPath = path.join(process.cwd(), imagePath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
    } 
  });
};

export { deleteLocalImage };
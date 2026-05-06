import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ✅ configure once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required");
    }

    const result = await cloudinary.uploader.upload(filePath);

    // ✅ safe delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result.secure_url;

  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("Cloudinary Error:", error);

    throw new Error(error.message || "Cloudinary upload failed");
  }
};

export default uploadOnCloudinary;
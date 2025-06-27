import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // remove local file after upload
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // cleanup on failure
    return null;
  }
};

// ✅ ADD THIS FUNCTION
const destroyOnCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video", // or "image" if you're deleting an image
    });

    return response;
  } catch (error) {
    console.error("Error destroying asset on Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, destroyOnCloudinary };

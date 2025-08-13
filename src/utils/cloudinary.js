import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        // Upload the file to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("FILE IS UPLOADED ON CLOUDINARY", uploadResponse.url);

        // Remove the file from local storage after upload see the public/temp carefully
        fs.unlinkSync(localFilePath);

        return uploadResponse;

    } catch (error) {
        // console.error("Cloudinary upload error:", error);
        // Remove the file if upload failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

export { uploadOnCloudinary };

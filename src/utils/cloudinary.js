import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs"


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath){
            return null;
        }
        // Upload the file on cloudinary
        response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploade successfully 
        console.log("FILE IS UPLOADED ON CLOUDINARY ",response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)//reomove the locally saved teporary file as the upload operator got fail;
        return null;
    }
}


export {uploadOnCloudinary}








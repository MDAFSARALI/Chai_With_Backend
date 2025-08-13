import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation-- not empty
    // .Check if user already exist: user name and email
    // Check for images and avatar
    // upload them to cloudinary,avatr
    // get url from cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response 
    // check for user creation
    // return response 

    const {username,fullName,email,password}=req.body
    console.log("email :" + email);
    if(
        [fullName,email,username,password].some((fiel)=>fiel?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User With email or username already exists...")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;  
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }
    const avatar= await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    const user=await User.create({
        fullName,
        avatr: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowercase()
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refereshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering a user...")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user Registered Successfully...")
    )

})  

export {registerUser}


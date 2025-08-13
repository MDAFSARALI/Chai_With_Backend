// For 1St Approach  :
/*
import mongoose from "mongoose";
import {DB_NAME} from './constants'

*/
// For 2nd Approach :
//require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

// FIRST APPROACH :
// IIFE immediate invoked Function and semi colun is just for cleaning purpose

/*
import express from "express";
const app=express();


;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" , (error)=>{
            console.log("ERROR ",error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log("App is listening on Port  "+process.env.PORT );
        })
    } catch (error) {
        console.error("ERROR " +error)
        throw error;
    }
})()

*/

//2ND APPROACH :

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(` * Server is running at the port : ${process.env.PORT} `); 
    })
})
.catch((err)=>{
    console.log("MONGO db Connection failed !!! " , err)
})
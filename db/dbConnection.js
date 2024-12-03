import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const URI = process.env.MongooseURI
const dbConnection = ()=>{
    try {
        mongoose.connect(URI)
        console.log("Database is connected sucessfully!!")
    }
    catch (error) {
        console.log("Database connection error is :", error)
    }
}

export {dbConnection}
import mongoose from "mongoose";

export const connectDB=async function(){
    
        return await mongoose.connect('mongodb://127.0.0.1:27017/NewsPublishing').then(()=>{
            console.log("The Database was Connected Successfully");
        }).catch((error)=>{
            console.log("An error occurred while connecting to the database " , error);
        })
   
}
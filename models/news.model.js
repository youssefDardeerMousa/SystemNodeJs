import mongoose, { Schema } from "mongoose";

let NewsSchema=new Schema({
    Title : {
        type: String,
        allowNull:false
    },
    
    post :{
        type: String,
        allowNull:false
    },
    UserId:{
        type:mongoose.Types.ObjectId,
        allowNull:false,
        ref :'Users'
    }
})

export let NewsModel=mongoose.model("News",NewsSchema)

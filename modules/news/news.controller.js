import { NewsModel } from "../../models/news.model.js"
import { UserModel } from "../../models/user.model.js";

export const CreateNews=async(req,res)=>{
    try {
        const payload = req.payload;
        console.log(payload);
        let {id} = payload;
        console.log(id);
        const user =await UserModel.findById({_id:id})
        if(!user){
            return res.json({status: 404,result:false, message:"User Not Found"});
        }
      let News = await NewsModel.create(req.body);
      return res.json({status:200,result:true,Message:"News created successfully",News});
    } catch (error) {
        res.json({status:404,result:false,error});

    }
}
export const allNews=async(req,res)=>{
    try {
      let News = await NewsModel.find({},{__v:0}).populate("UserId","FirstName LastName Email")
     return res.json({status:200,result:true,Message:"News created successfully",News});
    } catch (error) {
       return res.json({status:404,result:false,error});

    }
}
export const alluserNews=async(req,res)=>{
    let {id} = req.params;
    try {
      let News = await NewsModel.find({UserId:id},{__v:0})
     return res.json({status:200,result:true,Message:"News created successfully",News});
    } catch (error) {
       return res.json({status:404,result:false,error});

    }
}
//Update
export const UpdateNews=async(req,res)=>{
    try {
        const payload = req.payload;
        console.log(payload);
        let {id} = payload;
        console.log(id);
        const user =await UserModel.findById({_id:id})
        if(!user){
            return res.json({status: 404,result:false, message:"User Not Found"});
        }
        let {idd}=req.params
       let {Title,post}=req.body;
      let News = await NewsModel.findByIdAndUpdate({_id:idd},{Title,post},{new:true});
      res.json({status:200,result:true,Message:"News Updated successfully",News});
    } catch (error) {
        res.json({status:404,result:false,error});

    }
}
export const deleteNews=async(req,res)=>{
    try {
        const payload = req.payload;
        console.log(payload);
        let {id} = payload;
        console.log(id);
        const user =await UserModel.findById({_id:id})
        if(!user){
            return res.json({status: 404,result:false, message:"User Not Found"});
        }
        let {idd}=req.params
      
      let News = await NewsModel.findByIdAndDelete({_id:idd},);
      res.json({status:200,result:true,Message:"News Deleted successfully"});
    } catch (error) {
        res.json({status:404,result:false,error});

    }
}
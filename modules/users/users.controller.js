import { UserModel } from "../../models/user.model.js"
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config() 
export const SignUp = async (req, res) => {
   
    try {
      let { password, repassword, Email, FirstName, LastName, gender } = req.body;
 
      if (password !== repassword) {
        return res.json({ status: 404, result: false, message: 'Password and repassword do not match' });
      }
  
      const isEmailFound = await UserModel.findOne({ Email });
      if (isEmailFound) {
        return res.json({ status: 404, result: false, message: 'This email already exists' });
      }
  
      // Hash password
     let securityValue=Number(process.env.SecurityCostFactor)
      const hashPassword = bcryptjs.hashSync(password,securityValue);
      
      const data = await UserModel.create({
        FirstName,
        LastName,
        Email,
        password: hashPassword,
        repassword: hashPassword,
        gender,
      });
      //generate token
      // const token=jwt.sign({id:data._id,FirstName,LastName,Email},process.env.TOKENKEY,{
      //   // expiresIn:"1d" // في حالة لما ادمر التوكين ده
      //   // expiresIn:"1h" 
      //   // expiresIn:"2s" 
      // })
      const token=jwt.sign({id:data._id,FirstName,LastName,Email},process.env.TOKENKEY)
      console.log(token);
      return res.json({success:true,status:200,token,Message:"success Register"});
    } catch (error) {
      return res.json(error);
    }
  };
export const LogIn=async(req,res)=>{
    try {
        let {Email,password} = req.body;
       
        const CheckData=await UserModel.findOne({Email})
       
       if(!CheckData){
        return res.json({status:404,result:false,message:"Error Email"})
       }                      //bcryptjs.compareSync(passwordFromUser,HashPasswordFromData After Searching)
       const verifiyPassword = bcryptjs.compareSync(password,CheckData.password) // T || F

       if(!verifiyPassword){
        return res.json({status:404,result:false,message:"Invalid Password"})

       }
       
       return res.json({status:200,result:true,message:"Success Login"})
       
    } catch (error) {
        return res.json(error) 
    }
}
export const UpdateData=async (req,res)=>{
    let {Email,password,repassword} = req.body;
    let checkmail=await UserModel.findOne({Email});
    if(!checkmail){
        return res.json({status:404,result:false,message:"Invalid Email"})

    }
    else{
      let change=await UserModel.findOneAndUpdate({Email},{password,repassword},{new:true})
      if(password !== repassword){
        return res.json({status:404,result:false,message:"The password and repassword must be match"})

      }
      return res.json({status:200,result:true,message:"The password has been changed successfully",newdata:change})
    }
} 

export const profile = async (req,res)=>{
 try {
//console.log(req.youssef);
console.log(req.payload);
const payload = req.payload
  let {id} = payload;
  console.log(id);
  let user= await UserModel.findById({_id:id})
  if(!user){
    return res.json({status:404,result:false,message:"User not found"})
  }
  console.log(user);
  return res.json({status:200,result:true,user})
 } catch (error) {
  return res.json({status:404,result:false,error,Message:error.message,stack:error.stack})
 }
}

export const deleteAccount=async (req,res)=>{
 try {
 const payload = req.payload
  const {Email} = payload
  console.log(payload , Email);
  const deleteUser = await UserModel.findOneAndDelete({Email})
  if(!deleteUser){
    return res.json({status : 404 , result : false ,Message: "User Not Found !" })
  }
  return res.json({status : 200 , result : true ,Message: "Deleted Account Successfully!" })

 } catch (error) {
  return res.json({status : 404 , result : false ,error })

 }
}
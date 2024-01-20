import { Router } from "express";
import { LogIn, SignUp, UpdateData,profile,deleteAccount } from "./users.controller.js";
import jwt from 'jsonwebtoken'
import { IsAuthenticated } from "../../Middleware/auth.middleware.js";
const routeruser=Router();
routeruser.post("/Sign",SignUp)
routeruser.post("/LogIn",LogIn)
// routeruser.get("/profile",(req,res,next)=>{
// try {
//     let {token} = req.headers;
//     if(!token){
//       return res.json({status:404,result:false,error:"Token is required !"})
  
//     }
//     const payload =jwt.verify(token,process.env.TOKENKEY)
   
//     /**
//      * ل الدالة التنفيذية MiddleWare علشان تبعت اي متغير او داتا من 
//      *  reqده هيتم من خلال
//      req.variable ==>  والدالة هتستلمها بنفس الشكل
//     */
//    // req.youssef="Youssef Will Be a strong Programmer"
//     req.payload=payload
//     return next()
// } catch (error) {
//     return res.json({status:404,result:false,error})
// }
// },profile)
routeruser.get("/profile",IsAuthenticated,profile)
routeruser.patch("/changePassword",IsAuthenticated,UpdateData)
routeruser.delete("/Delete",IsAuthenticated,deleteAccount)


export default routeruser
import jwt from 'jsonwebtoken'
export const IsAuthenticated=(req,res,next)=>{
    try {
    
        let {token} = req.headers;
        if(!token.startsWith(process.env.SecritKeyToken)){
            return res.json({status:404,result:false,error:"Invalid Token!"})
        }
        if(!token){
          return res.json({status:404,result:false,error:"Token is required !"})
      
        }
        token=token.split(process.env.SecritKeyToken).join("")
        // token=token.split("Route_")[1]
        
        const payload =jwt.verify(token,process.env.TOKENKEY)
        
       
        /** 
         * ل الدالة التنفيذية MiddleWare علشان تبعت اي متغير او داتا من 
         *  reqده هيتم من خلال
         req.variable ==>  والدالة هتستلمها بنفس الشكل
        */
       // req.youssef="Youssef Will Be a strong Programmer"
        req.payload=payload
        return next()
    } catch (error) {
        return res.json({status:404,result:false,error})
    }
    }
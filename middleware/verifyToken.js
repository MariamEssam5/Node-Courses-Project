const jwt=require('jsonwebtoken')
const appError=require('../utils/appError.js')
const httpStatusText=require('../utils/httpStatusText.js')
const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization
    if(!token)
    {
        const error= appError.create("Unauthorized", 401, httpStatusText.FAIL)
        return next(error) 
    }
try
    {   const decodedtoken= jwt.verify(token, process.env.JWT_SECRET)
        req.currentUser=decodedtoken

        next()
    }  
catch(error)
    {
        const err=appError.create("Invalid Token", 401, httpStatusText.FAIL)
        return next(err)
    }      
  


}

module.exports=verifyToken;
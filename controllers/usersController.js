const asyncWrapper=require('../middleware/asyncWrapper.js')
const User=require('../models/user.model.js')
const httpStatusText=require('../utils/httpStatusText.js')
const appError=require('../utils/appError.js')  
const bcrypt=require('bcryptjs')
const userRoutes=require('../routes/usersRoute.js') 
const { create } = require('../models/course_model')
const jwt=require('jsonwebtoken')
const generateJWT = require('../utils/generateJWT.js')  
const getAllUsers=asyncWrapper(async(req,res)=>
{
    //get all users from db using user model
   //pagination
    const limit=req.query.limit || 10;
    const page=req.query.page || 1;
    const skip=(page-1)*limit;

    const users=await User.find({},{__v:0, password:0}).limit(limit).skip(skip); 
    res.json({status:httpStatusText.SUCCESS, data:{users}});
}
)
const registerUser=asyncWrapper(async(req,res,next)=>{
    const {firstName,lastName,email,password,role}=req.body
    console.log(req.body);
   const oldUser=await User.findOne({
        email
   })
   
   if(oldUser)
   {
    const error= appError.create("User already exists", 400, httpStatusText.FAIL)
    return next(error)
   }

   //password hashing
   const hashedPassword=await bcrypt.hash(password,10)

    const newUser=new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        role:role,
        avatar:req.file.filename
    })

    //generate jwt token:
    const token=await generateJWT({id:newUser._id, email:newUser.email, role:newUser.role})
    newUser.token=token
    await newUser.save()
    res.status(201).json({status:httpStatusText.SUCCESS, data:{user:newUser}});

    if(!firstName || !lastName || !email || !password)
    {
        const error= appError.create("Missing required fields", 400, httpStatusText.FAIL)
        return next(error)
    }
})

const loginUser=asyncWrapper(async (req,res,next  )=>{
const {email,password}=req.body
if(!email || !password)
{
    const error= appError.create("Missing required fields", 400, httpStatusText.FAIL)
    return next(error)
}
const user=await User.findOne({email})
if(!user)
{
    const error= appError.create("Invalid email or password", 401, httpStatusText.FAIL)
    return next(error)
}
const matchedPassword=await bcrypt.compare(password,user.password)
if(!matchedPassword)
{
    const error= appError.create("Invalid email or password", 401, httpStatusText.FAIL)
    return next(error)
}
//loggedin successful, generate new token
const token=await generateJWT({id:user._id, email:user.email,role:user.role})
res.json({status:httpStatusText.SUCCESS, data:{token}})  
})

module.exports={
    getAllUsers,
    registerUser,
    loginUser
}
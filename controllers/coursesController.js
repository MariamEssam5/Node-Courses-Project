// let {courses}=require('../data/courses.js')
const Course=require('../models/course_model.js')
const {validationResult}=require('express-validator')
const httpStatusText=require('../utils/httpStatusText.js')
const asyncWrapper=require('../middleware/asyncWrapper.js') 
const appError=require('../utils/appError.js')  

const getAllCourses=asyncWrapper(async(req,res)=>
{
    //get all courses from db using course model
   //pagination
    const limit=req.query.limit || 10;
    const page=req.query.page || 1;
    const skip=(page-1)*limit;

    const courses=await Course.find({},{__v:0}).limit(limit).skip(skip); 
    res.json({status:httpStatusText.SUCCESS, data:{courses}});
}
)

const getCourseById=asyncWrapper(async (req,res,next)=>
{
    
   const course= await Course.findById(req.params.id) 
 if(!course)
    {
        const error =appError.create("Course Not Found", 404, httpStatusText.FAIL)
       
        return next(error)
        // return res.status(404).json({status:httpStatusText.FAIL, data:{course:"Course Not Found"}})
    }
    res.json({status:httpStatusText.SUCCESS, data:{course}});
    
    // catch (error)
    // {
    //     return res.status(500).json({status:httpStatusText.ERROR, data:{msg:error.message, code:error.code}})
    // }
   
}
)
 
const createCourse=asyncWrapper(async (req,res,next)=> 
{ 
const {title,price}=req.body
const errors=validationResult(req)
if(!errors.isEmpty())
{
    return next({message:"Validation Error", code:400, errors:errors.array()})
// return res.status(400).json({status:httpStatusText.FAIL, data:{errors:errors.array()}});
}
const newCourse=new Course(req.body);
 await newCourse.save()
res.status(201).json({status:httpStatusText.SUCCESS, data:{course:newCourse}});
}
)

const updateCourse= asyncWrapper(async (req,res,next)=>
{
    const courseId=req.params.id;
    try{
            const updatedCourse=await Course.findByIdAndUpdate(courseId,{$set:{...req.body}},{returnDocument:'after'})
            res.status(200).json({status:httpStatusText.SUCCESS, data:{course:updatedCourse}})
            if(!updatedCourse)
            {
                const error =appError.create("Course Not Found", 404, httpStatusText.FAIL)
                return next(error)
            }
        }
    catch(error)
    {
        const err =appError.create("Internal Server Error", 500, httpStatusText.ERROR)
        return next(err)
    }
   

}
)
const deleteCourse= asyncWrapper(async (req,res,next)=>
{
    try{
        const deletedCourse=await Course.findByIdAndDelete(req.params.id);
        if(!deletedCourse)
        {
            const error =appError.create("Course Not Found", 404, httpStatusText.FAIL)
            return next(error)
        }
        res.status(200).json({status:httpStatusText.SUCCESS, data:null});
    }
    catch(error)
    {
        const err =appError.create("Internal Server Error", 500, httpStatusText.ERROR)
        return next(err)
    }
   
}
)
   

module.exports={
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}


const mongoose = require('mongoose');
// import validator from './../node_modules/validator/es/index';
const { validate } = require('./course_model');
const {Schema}=mongoose;
const validator=require('validator');
const { userRoles } = require('../utils/userRoles');
const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true, "First Name is required"]
    },
    lastName:{
        type:String,
        required:[true, "Last Name is required"]
    },
        email:{
            type:String,
            required:[true, "Email is required"],
            unique:true,
            validate:[validator.isEmail, "Please provide a valid email"]
        },
        password:{
            type:String,
            required:[true, "Password is required"],
        },
        token:{
            type:String
        },
        role:{
            type:String,
            enum:[userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
            default:userRoles.USER
        },
        avatar:{
            type:String,
            default:'uploads/profile.jpg'

        }

})

module.exports=mongoose.model('User',userSchema)
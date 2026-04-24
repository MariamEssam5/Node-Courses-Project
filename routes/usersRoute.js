const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");
const verifyToken=require('../middleware/verifyToken.js') ;
const multer=require('multer');
const appError = require("../utils/appError.js");

const diskStorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    console.log("file:",file);
    cb(null,'uploads')
    
  },
  filename:(req,file,cb)=>{
        const ext=file.mimetype.split('/')[1]
    const fileName=Date.now() + '-' + file.originalname+'.'+ext
    cb(null,fileName)

  }
})

const fileFilter=(req,file,cb)=>{
  if(file.mimetype.split('/')[0]==='image')
  {
    cb(null,true)//34an a5ly multer y7ml el file kda hwa el no3 mazboot.

  }
  else
  {
    return cb (appError.create("Only images are allowed", 400),false)
  }
}
const upload=multer({storage:diskStorage,
  fileFilter})//34an a3ml handle ll file uploads w a7dd el destination bta3t el files ele hatet7ml
//get all users
//register
//login

router
  .route("/")
  .get(verifyToken,usersController.getAllUsers)

  router.route("/register")
  .post(upload.single('avatar'), usersController.registerUser);

router.route("/login")
  .post( usersController.loginUser);



module.exports = router;
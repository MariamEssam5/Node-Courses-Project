const express = require('express');
const mongoose= require ("mongoose");
const app = express();
let {courses}=require('./data/courses.js')
const  url="mongodb://mariam:mariam123@ac-elcubqd-shard-00-00.pjtzglr.mongodb.net:27017,ac-elcubqd-shard-00-01.pjtzglr.mongodb.net:27017,ac-elcubqd-shard-00-02.pjtzglr.mongodb.net:27017/codeZone?ssl=true&replicaSet=atlas-pawcxs-shard-0&authSource=admin&appName=learn-mongo-db"
require('dotenv').config()//34an a3ml access ll env variables   
const httpStatusText=require('./utils/httpStatusText.js')
const cors=require('cors')
const path=require('path')

const courseRoutes=require('./routes/courseRoutes.js')
const usersRouter=require('./routes/usersRoute.js')


app.use(express.json())//middleware 34an nhndle el json ele gay mn postman

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))//34an a3ml access ll uploads folder mn el browser
app.use('/',courseRoutes)//34an a3ml routing ll course routes
app.use('/api/users',usersRouter)//34an a3ml routing ll users routes

mongoose.connect(process.env.MONGO_URL).then(()=>
{
    console.log("Connected to db");
})

//cors
app.use(cors());
//wildcard => glopal middleeware for notfound routes
app.use((req,res)=>
{
    res.status(404).json({status:httpStatusText.ERROR, data:{msg:"Route not found"}})
})

//glopal error handling middleware
app.use((error,req,res,next)=>{
    res.status(error.code || 500).json({status:error.statusText || httpStatusText.ERROR, data:{msg:error.message, code:error.code}})
})

app.listen(process.env.PORT,()=>
{
    console.log(`Server is running on port ${process.env.PORT}`)
})



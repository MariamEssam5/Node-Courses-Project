const express = require("express");
const router = express.Router();
const courseController = require("../controllers/coursesController.js");
const { validationSchema } = require("../middleware/validataionSchema.js"); 
const verifyToken = require("../middleware/verifyToken.js");
const { userRoles } = require("../utils/userRoles.js");
const allowedTo=require('../middleware/allowedTo.js')

router
  .route("/api/courses")
  .get(courseController.getAllCourses)
  .post(verifyToken,validationSchema, allowedTo(userRoles.MANAGER),courseController.createCourse);

router.get("/api/courses/:id", courseController.getCourseById);
router.patch("/api/courses/:id", courseController.updateCourse); 
router.delete("/api/courses/:id",verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER), courseController.deleteCourse);

module.exports = router;
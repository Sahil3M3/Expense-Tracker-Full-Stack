const express=require('express')
const router=express.Router();
const authenticate=require("../middleware/auth")

const userController=require('../controller/userController')


router.post('/signup',userController.postUser);
router.post('/login',userController.loginUser);
router.patch("/",authenticate,userController.updateUser);
router.get("/",authenticate,userController.getUser);


module.exports=router;
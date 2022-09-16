const express=require("express")
const router=express.Router();
const {route}=require("./ticketrouter");
const {insertUser}=require("../model/user/Usermodel")

router.all('/',(req,res,next)=>{
    // console.log("hey")
    // res.json({message:"return from user router"});
    next();
});


router.post("/",async(req,res)=>{
    // console.log(req.body);

    const result = await insertUser(req.body)
    res.json({message:'New user Connected',result});
});

module.exports=router;
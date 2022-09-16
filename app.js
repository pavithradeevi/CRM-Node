require('dotenv').config();
const express =require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");

const port = process.env.PORT || 3001;

// API Secuirty

app.use(helmet());

// cors

app.use(cors());

// mongodb

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

if(process.env.NODE_ENV !== 'production'){
    const mDb=mongoose.connection;

    mDb.on("open",()=>{
        console.log("Mongodb connected")
    });
    mDb.on("error",(error)=>{
        console.log(error);
    });

    // logger

app.use(morgan("tiny"));

}




// set body-parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Load router

const userRouter=require("./src/routers/userrouter");
const ticketRouter=require("./src/routers/ticketrouter")

// use
app.use("/v1/user",userRouter);
app.use("/v1/ticket",ticketRouter);

const handleError=require("./src/utils/errorHandler")

app.use((req,res,next)=>{
    const error=new Error("Resource not found");
    error.status = 404;
    next(error);
    // res.json({message:"Rosource Not Found"});
});

app.use((error, req, res, next) => {
    handleError(error, res);
  });
  



app.listen(port,()=>{
    console.log(`API is ready on http://localhost:${port}`);
});
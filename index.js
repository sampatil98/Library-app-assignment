const express=require("express");
const cors=require("cors");
require("dotenv").config();
const morgan=require("morgan");

const {connection}=require("./config/db");
const {userRouter}=require("./Routes/user.routes");
const {booksrouter}=require("./Routes/books.routes");

const app=express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/user",userRouter);
app.use("/book",booksrouter);

app.get("/",(req,res)=>{
    res.status(200).send({
        message:"Welcome To Library-App Backend"
    })
});

app.listen(process.env.port,async ()=>{
    try {
        await connection;
        console.log("connected to DB");
        console.log(`server is running at port ${process.env.port}`);
        
    } catch (error) {
        console.log(error)
    }
})
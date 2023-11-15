const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const {UserModel}=require("../Models/user");

const userRouter=Router();

userRouter.post("/register",async(req,res)=>{
    try {
        let {username,email,password,role}=req.body;

        const user= await UserModel.findOne({email});

        if(user){
          return  res.status(400).send({
            isError:true,
            message:"User already exist please login"});
        }

        bcrypt.hash(password,10,async(err,hash)=>{
            if(hash){
                const newuser= new UserModel({username,email,password:hash,role});
                await newuser.save();

                res.status(200).send({
                    isError:false,
                    message:"user created successfully",
                    data:newuser
                })
                
            }else{
                return  res.status(400).send({
                    isError:true,
                    message:err
                })
            }
        });
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
});

userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user= await UserModel.findOne({email});
        

        if(!user){
            return res.status(400).send({
                isError:true,
                message:"User not found please register first"
            })
        }

        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token= jwt.sign({userid:user._id,username:user.username,role:user.role},process.env.secret_token_key);
                    
                    res.status(200).send({
                        isError:false,
                        message:"login successful",
                        token:token
                    });
            }else{
                res.status(400).send({
                    isError:true,
                    message:"Wrong password"
                });
            }
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }

})

module.exports={userRouter};
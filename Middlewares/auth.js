const jwt=require("jsonwebtoken");
require("dotenv").config();

const authentication= async (req,res,next)=>{
    
    let token = req.headers.authorization;
    
    if(token){
        try{
            token=token.split(" ")[1];
            let decode= jwt.verify(token,process.env.secret_token_key);
            
            if(decode){
                req.user=decode;
                next();
            }else{
                res.status(400).send({
                    isError:true,
                    message:"Please login first"
                });
            }
        }catch(error){
            res.status(400).send({
                isError:true,
                message:error.message});
        }
    }else{
        res.status(400).send({
            isError:true,
            message:"Please login first"
        });
    }

}

module.exports={authentication}
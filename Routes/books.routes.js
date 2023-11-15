const {Router}=require("express");

const {BookModel}=require("../Models/books");
const {authentication}=require("../Middlewares/auth");

const booksrouter=Router();

booksrouter.post("/",authentication, async(req,res)=>{
    try {
        
        const { title, author } = req.body;
        const createdBy= req.user.username;
        const userid=req.user._id;

        if(req.user.role.includes("CREATOR")){
            const newbook = new BookModel({ title, author, createdBy, userid});
            await newbook.save();

            res.status(201).send({
                isError:false,
                message:"book created successfully",
                data:newbook
            });

        }else{
            res.status(403).send({
                isError:false,
                message:"Unauthorised user"
            });
        }
  
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
});

booksrouter.get("/",authentication,async(req,res)=>{
    try {
        let {old}=req.query;
        let newsearch=req.query.new;

        let search={};
        
        if(newsearch){
            search.createdAt={ $gt: new Date(Date.now() - 600000)}
        }
        if(old){
            search.createdAt={ $lte: new Date(Date.now() - 600000)}
        }

        if (req.user.role.includes('VIEW_ALL')) {
             let data= await BookModel.find(search);
             return res.status(200).send({
                isError:false,
                data:data
            })
        } 
        if (req.user.role.includes('VIEWER')) {
            
            search.userid = req.user._id;
            let data= await BookModel.find(search);
            return res.status(200).send({
                isError:false,
                data:data
            })
        } 

        res.status(403).send({ 
            isError:true,
            message: 'Access denied. Insufficient permissions.'
        });
        
    } catch (error) {
        res.status(400).send({ 
            isError:true,
            message: error.message
        });
    }
});


module.exports={booksrouter}
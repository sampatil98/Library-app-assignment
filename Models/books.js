
const mongoose=require("mongoose");

const bookSchema= new mongoose.Schema({
    title: { type:String, require:true},
    author: { type:String, require:true},
    createdAt: { type: Date, default: Date.now },
    createdBy: { type:String, require:true},
    userid:{ type:String, require:true}
})

const BookModel = mongoose.model('Book', bookSchema);

module.exports={BookModel};
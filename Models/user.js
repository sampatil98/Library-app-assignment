const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    username: { type:String, require:true},
    email: { type:String, require:true},
    password: { type: String, require:true},
    role: [{ type: String,
        enum: ['CREATOR', 'VIEWER', 'VIEW_ALL'],}]
});

const UserModel = mongoose.model('User', userSchema);

module.exports={UserModel};
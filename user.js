const mongoose=require('mongoose');

var schema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    userType:{type:String,enum:["admin","user"],default:"user"},
})
var UserModel=mongoose.model("user",schema)
module.exports=UserModel
const mongoose=require('mongoose');

var schema=mongoose.Schema({
    Pname:String,
    price:Number,
    description:String,
    image:String
})
var ProductModel=mongoose.model("product",schema)
module.exports=ProductModel
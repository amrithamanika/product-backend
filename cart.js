const mongoose = require ("mongoose");

const cartSchema = mongoose.Schema({

    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product"},

});


const CartModel = mongoose.model("cart",cartSchema);
module.export=CartModel;
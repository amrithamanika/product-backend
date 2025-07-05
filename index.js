// import
const express=require("express")
require("./connection")
var cors=require("cors")
var proModel=require('./model/product')
var stModel=require('./model/user')
const UserModel = require("./model/user")
const CartModel=require('./model/cart');
// initalize
const app=express()
// midd
app.use(express.json());
app.use(cors());

// api creation
app.get('/', (req, res) => {
  res.send('Hello World')
})
// add api
app.post('/add',async(req,res)=>{
    try {
        await proModel(req.body).save()
        res.send({message:"Data added!"})
    } catch (error) {
       console.log(error)
    }
})
// add user api
app.post('/adus',async(req,res)=>{
    try {
        await stModel(req.body).save()
        res.send({message:"Signed up successful!"})
    } catch (error) {
       console.log(error)
    }
})
// view
app.get('/view',async(req,res)=>{
    try {
        const data=await proModel.find()
        res.send(data)
    } catch (error) {
       console.log(error)
    }
})

// view
app.get('/vu',async(req,res)=>{
    try {
        const data=await stModel.find()
        res.send(data)
    } catch (error) {
       console.log(error)
    }
})

// delete
app.delete('/del/:id',async(req,res)=>{
    try {
        await proModel.findByIdAndDelete(req.params.id)
        res.send({message:"Data deleted!"})
    } catch (error) {
       console.log(error)
    }
})

// update
app.put('/up/:id',async(req,res)=>{
    try {
        const update=await proModel.findByIdAndUpdate(req.params.id,req.body,)
        res.send({message : "Data updated!"})
        // res.json(update);
        
    } catch (error) {
       console.log(error);
    }
})


// login
app.post("/log",async(req,res)=>{
    try{
        var user=await UserModel.findOne({email:req.body.email});
        if(!user){
            return res.send("User Not Found");
        }
    if(user.password ===req.body.password){
        return res.send({message:"Logged In Successfully",
            userType:user.userType,
            email:user.email,
             name:user.name,
             id:user.userId
        });
    }else{
        return res.send("Invalid Credentials");
    }
    }catch(error){
        console.log(error)
        return res.send("An error occurred")
    }
})


// add to cart    
app.post("/add-to-cart",async(req,res)=>{
    try{
        await CartModel(req.body).save();
        res.send({message:"Added to cart"});
    }catch(error){
        console.log(error);
        res.send({message:"Failed to add to cart"});
    }
})
// fetch cart
app.get("/my-cart?/:userId",async(req,res)=>{
    try{
        const cartItems = await CartModel.find({userId:req.params.userId}).populate("productId");
        res.send(cartItems);
    }catch(err){
        res.send({message:"Error fetching cart"});
    }
})
// port setting
app.listen(3000,()=>{
    console.log("port is running")
})
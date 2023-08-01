const mongoose=require('mongoose');
require('dotenv').config();
const Mongo=process.env.MONGO_URI;
const food=require('./schema.js')
const connectToMongo=async()=>{
    await mongoose.connect(Mongo);
    console.log("CONNECTED TO MONGODB");
}
module.exports=connectToMongo;
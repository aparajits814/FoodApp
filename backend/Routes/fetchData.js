const express = require('express');
const router = express.Router();
const food_items=require('../schema.js');
router.post("/fetchData",async(req,res)=>{
    const data=await food_items.find({});
    res.json(data);
})


module.exports=router;
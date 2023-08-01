const mongoose=require('mongoose');
const {Schema}= mongoose;
const FoodItemSchema=new Schema({
    CategoryName:{
        type:String
    },
    name:{
        type:String
    },
    img:{
        type:String
    },
    options:{
        type:Array
    },
    description:{
        type:String
    }
});
const food_item=mongoose.model('food_items',FoodItemSchema);
module.exports=food_item;
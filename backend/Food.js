const mongoose=require('mongoose');
const {Schema}= mongoose;
const Food=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    data:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const foodHistory=mongoose.model('foodhistorys',Food);
module.exports=foodHistory;
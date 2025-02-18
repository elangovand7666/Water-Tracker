import mongoose from "mongoose";

const modelss=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    height:{
        type:String,
        required:true
    },
    drink:{
        type:String,
        required:true
    },
    count:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model('Track',modelss)
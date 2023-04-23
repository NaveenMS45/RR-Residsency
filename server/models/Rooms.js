const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    currentBookings:[],

    imageUrls:[],
    maxCount:{
        type:Number ,
         required:true
    },
    phoneNumber:
    {
        type:Number, 
        required:true
    },
    rentPerDay:
    {
        type:Number,
         required:true
    },
    type:
    {
        type:String,
        required:true
    },
    

}, { timestamps: true })



module.exports = mongoose.model('Rooms' , roomSchema)
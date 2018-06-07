'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var FarmSchema=Schema({
    name:String,
    address:String,
    area:Number,        
    crop:[{type:Schema.ObjectId, ref: 'Crop'}],
    mark:[{type:Schema.ObjectId, ref: 'Mark'}]
    
});

module.exports=mongoose.model('Farm',FarmSchema);
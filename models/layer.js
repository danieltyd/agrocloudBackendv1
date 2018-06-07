'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var LayerSchema=Schema({
    typeLayer:String,
    image:String,
    date:String,
    area:Number,
    red:Number,
    orange:Number,
    yellow:Number,
    green:Number,
    lightgreen:Number,
    average:Number
    
});

module.exports=mongoose.model('Layer',LayerSchema);
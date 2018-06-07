'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CropTypeSchema = Schema({
    name:String,
    description:String,
    
});

module.exports=mongoose.model('CropType',CropTypeSchema);
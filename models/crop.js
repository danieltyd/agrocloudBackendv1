'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CropSchema=Schema({
    name:String,
    position:String,
    cropType:{type:Schema.ObjectId, ref: 'CropType'},        
    problem:[{type:Schema.ObjectId, ref: 'Problem'}],
    flight:[{type:Schema.ObjectId, ref: 'Flight'}]
});

module.exports=mongoose.model('Crop',CropSchema);
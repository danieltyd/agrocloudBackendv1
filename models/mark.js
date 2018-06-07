'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MarkSchema=Schema({
    name:String,
    position:String,
    typeMark:String
});

module.exports=mongoose.model('Mark',MarkSchema);
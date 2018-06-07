'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PkgSchema=Schema({
    name:String,
    area:Number,
    price:Number

});

module.exports=mongoose.model('Pkg',PkgSchema);
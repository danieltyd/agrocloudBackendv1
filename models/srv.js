'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var SrvSchema=Schema({
    name:String,    
});

module.exports=mongoose.model('Srv',SrvSchema);
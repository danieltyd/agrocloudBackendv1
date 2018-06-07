'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ProblemTypeSchema = Schema({
    name:String,
    description:String
});

module.exports=mongoose.model('ProblemType',ProblemTypeSchema);
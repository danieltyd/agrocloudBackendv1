'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ProblemSchema = Schema({
    description:String,
    stateP:Boolean,
    image:String,
    mark:{type:Schema.ObjectId, ref:'Mark'},
    problemType:[{type:Schema.ObjectId, ref:'ProblemType'}]
});

module.exports=mongoose.model('Problem',ProblemSchema);
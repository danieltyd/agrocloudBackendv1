'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PlanSchema = Schema({
    name:String,
    price:Number,
    srv:[{type:Schema.ObjectId, ref:'Srv'}],
    pkg:{type:Schema.ObjectId, ref:'Pkg'}
});

module.exports=mongoose.model('Plan',PlanSchema);
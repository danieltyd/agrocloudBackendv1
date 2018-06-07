'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var RelationSchema=Schema({
    user:{type:Schema.ObjectId, ref:'User'},
    plan:{type:Schema.ObjectId, ref:'Plan'},
    pkg:{type:Schema.ObjectId, ref:'Pkg'},
    farm:{type:Schema.ObjectId, ref:'Farm'},
    mark:[{type:Schema.ObjectId, ref:'Mark'}],
    crop:[{type:Schema.ObjectId, ref:'Crop'}],
    flight:[{type:Schema.ObjectId, ref:'flight'}]   
});

module.exports=mongoose.model('Relation',RelationSchema);
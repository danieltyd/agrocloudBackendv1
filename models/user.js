'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema=Schema({
    name:String,
    surname:String,
    email:String,
    password:String,
    role:String,    
    state:String,
    phone:String,
    country:String,
    city:String,
    company:String,
    ruc:String,
    plan:{type:Schema.ObjectId, ref:'Plan'},
    farm:{type:Schema.ObjectId, ref:'Farm'}
});

module.exports=mongoose.model('User',UserSchema);
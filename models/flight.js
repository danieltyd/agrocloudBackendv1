'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var FlightSchema = Schema({
    urlName:String,
    date:String,
    processed:Boolean,
    layer:[{type:Schema.ObjectId, ref:'Layer'}]
    
});

module.exports=mongoose.model('Flight',FlightSchema);
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret='clave_secreta_del_prototipo_api_1';

exports.createToken=function(user){
    var payload={
        sub: user._id,
        name:user.name,
        surname:user.surname,
        email:user.email,       
        state:user.state,       
        country:user.country,
        city:user.city,
        company:user.company,        
        plan:user.plan,
        farm:user.farm,
        iat:moment().unix(),
        exp:moment().add(30,'days').unix()

    };

    return jwt.encode(payload,secret);
};
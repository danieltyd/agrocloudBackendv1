'use strict'

exports.isAdmin = function(req,res,next){
    if(req.user.role != 'ROLE_ADMIN'){
        return res.status(200).send({messaje:'Zona restringida para Usuarios con Rol ROLE_ADMIN, tu Rol es: '+req.user.role});
    }
    next();
}

exports.isCampOperator = function(req,res,next){
    if(req.user.role != 'ROLE_CAMP_OPERATOR'){
        return res.status(200).send({messaje:'Zona restringida para Usuarios con Rol ROLE_CAMP_OPERATOR, tu Rol es: '+req.user.role});
    }
    next();
}
exports.isOfficeOperator = function(req,res,next){
    if(req.user.role != 'ROLE_OFFICE_OPERATOR'){
        return res.status(200).send({messaje:'Zona restringida para Usuarios con Rol ROLE_OFFICE_OPERATOR, tu Rol es: '+req.user.role});
    }
    next();
}
exports.isAlly = function(req,res,next){
    if(req.user.role != 'ROLE_ALLY'){
        return res.status(200).send({messaje:'Zona restringida para Usuarios con Rol ROLE_ALLY, tu Rol es: '+req.user.role});
    }
    next();
}
exports.isClient = function(req,res,next){
    if(req.user.role != 'ROLE_CLIENT'){
        return res.status(200).send({messaje:'Zona restringida para Usuarios con Rol ROLE_CLIENT, tu Rol es: '+req.user.role});
    }
    next();
}
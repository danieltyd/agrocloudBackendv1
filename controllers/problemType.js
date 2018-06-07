'use strict'

var ProblemType=require('../models/problemType');

function saveProblemT(req,res){
    var problemType=new ProblemType();
    var params=req.body;

    if(params.name && params.description){
        problemType.name=params.name;
        problemType.description=params.description;

        ProblemType.findOne({
            name:params.name
        },(err,issetProblemT)=>{
            if(err){
                res.status(500).send({
                    message:'Error al comprobar el ProblemType'
                });
            }else{
                if(!issetProblemT){
                    problemType.save((err,problemTStored)=>{
                        if(err){
                            res.status(500).send({
                                message:'Error al guardar el problem Type'
                            });
                        }else{
                            if(!problemTStored){
                                res.status(404).send({
                                    message:'No se ha guardado el Problem Type'
                                });
                            }else{
                                res.status(200).send({
                                    problemType:problemTStored
                                });
                            }
                        }
                    })
                }else{
                    res.status(200).send({
                        message:'Error, ya esta registrado'
                    });
                }
            }
        });
    }else{
        res.status(200).send({
            message:'Introduce los datos correctamente'
        });
    }
}



function updateProblemT(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    ProblemType.findByIdAndUpdate(modelId,toUpdate,{
        new:true
    },(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al actualizar problem type'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha guardado el problem type'
                });
            }else{
                res.status(200).send({
                    problemT:modelUpdated
                });
            }
        }
    });
}


function deleteProblemT(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    ProblemType.findByIdAndRemove(modelId,{},(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al eliminar ProblemType'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha eliminado el Problem Type'
                });
            }else{
                res.status(200).send({
                    message:'Problem Type eliminado'
                });
            }
        }
    });
}



function getProblemT(req,res){
    var modelId=req.params.id;

    ProblemType.findOne({
        _id:modelId
    },(err,problemT)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener los datos del Problem Type'
            });
        }else{
            if(!problemT){
                res.status(404).send({
                    message:'No existe el Problem Type'
                });
            }else{
                res.status(200).send({
                    problemType:problemT
                });
            }
        }
    })
}



function getProblemTs(req,res){
    ProblemType.find({},(err,problemTs)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener los Problem Types'
            });
        }else{
            if(!problemTs){
                res.status(404).send({
                    message:'No exixten problem Types'
                });
            }else{
                res.status(200).send({
                    problemTypes:problemTs
                });
            }
        }
    });
}

module.exports={
    saveProblemT,
    updateProblemT,
    deleteProblemT,
    getProblemT,
    getProblemTs
}
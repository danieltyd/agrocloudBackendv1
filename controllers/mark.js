'use strict'

var Marca=require('../models/mark');

function saveMark(req,res){
    var marca=new Marca();
    var params=req.body;

    if(params.name && params.position && params.typeMark){
        marca.name=params.name;
        marca.position=params.position;
        marca.typeMark=params.typeMark;

      
                    marca.save((err,markStored)=>{
                        if(err){
                            res.status(500).send({
                                message:'Error al guardar la Marca'
                            });
                        }else{
                            if(!markStored){
                                res.status(404).send({
                                    message:'No se ha guardado la marca'
                                });
                            }else{
                                res.status(200).send({
                                    marca:markStored
                                });
                            }
                        }
                    })
                
    }
}



function updateMark(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    Marca.findByIdAndUpdate(modelId,toUpdate,{
        new:true
    },(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al actualizar la Marca'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha actualizado la marca'
                });
            }else{
                res.status(200).send({
                    Marca:modelUpdated
                });
            }
        }
    });
}


function deleteMark(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    Marca.findByIdAndRemove(modelId,{},(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al eliminar la Marca'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha eliminado la Marca'
                });
            }else{
                res.status(200).send({
                    message:'Marca eliminada'
                });
            }
        }
    });
}



function getMark(req,res){
    var modelId=req.params.id;

    Marca.findOne({
        _id:modelId
    },(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener los datos de la marca'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No existe la marca'
                });
            }else{
                res.status(200).send({
                    Marca:modelRes
                });
            }
        }
    })
}



function getMarks(req,res){
    Marca.find({},(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener las marcas'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No exixten marcas'
                });
            }else{
                res.status(200).send({
                    Marcas:modelRes
                });
            }
        }
    });
}

module.exports={
    saveMark,
    updateMark,
    deleteMark,
    getMark,
    getMarks
}
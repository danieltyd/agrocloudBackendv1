'use strict'

var CropType=require('../models/cropType');

function saveCropType(req,res){
    var cropType=new CropType();
    var params=req.body;

    if(params.name && params.description){
        cropType.name=params.name;
        cropType.description=params.description;
        

        CropType.findOne({
            name:params.name
        },(err,issetCropType)=>{
            if(err){
                res.status(500).send({
                    message:'Error al comprobar El tipo de Cultivo'
                });
            }else{
                if(!issetCropType){
                    cropType.save((err,cropTStored)=>{
                        if(err){
                            res.status(500).send({
                                message:'Error al guardar el Tipo de Cultivo'
                            });
                        }else{
                            if(!cropTStored){
                                res.status(404).send({
                                    message:'No se ha guardado el Tipo de cCultivo'
                                });
                            }else{
                                res.status(200).send({
                                    Cultivo:cropTStored
                                });
                            }
                        }
                    })
                }else{
                    res.status(200).send({
                        message:'Error, cultivo ya registrado'
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



function updateCropType(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    CropType.findByIdAndUpdate(modelId,toUpdate,{
        new:true
    },(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al actualizar el tipo cultivo'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha actualizado el Typo de Cultivo'
                });
            }else{
                res.status(200).send({
                    Cultivo:modelUpdated
                });
            }
        }
    });
}


function deleteCropType(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    CropType.findByIdAndRemove(modelId,{},(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al eliminar el Tipo de Cultivo'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha eliminado el Tipo de Cultivo'
                });
            }else{
                res.status(200).send({
                    message:'Cultivo eliminada'
                });
            }
        }
    });
}



function getCropType(req,res){
    var modelId=req.params.id;

    CropType.findOne({
        _id:modelId
    },(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener los datos del tipo de cultivo'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No existe el tipo de cutivo'
                });
            }else{
                res.status(200).send({
                    Cultivo:modelRes
                });
            }
        }
    })
}



function getCropTypes(req,res){
    CropType.find({},(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener el Tipo Cultivo'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No exixten Tipos de cultivos'
                });
            }else{
                res.status(200).send({
                    Cultivos:modelRes
                });
            }
        }
    });
}

module.exports={
    saveCropType,
    updateCropType,
    deleteCropType,
    getCropType,
    getCropTypes
}
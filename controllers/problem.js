'use strict'

var Problem =require('../models/problem');
var ProblemType= require('../models/problemType');
var Mark=require('../models/mark');

//modulos
var fs=require('fs');
var path=require('path');

function saveProblem(req,res){
    var problem=new Problem();
    var params=req.body;

    if(params.description){
        problem.description=params.description;
        problem.stateP=true;
        problem.mark=null;
        problem.problemType=[];

        problem.save((err,modelStored)=>{
            if(err){
                console.log(err);
                res.status(500).send({
                    messaje:'Error al guardar el problema'
                });
            }else{
                if(!modelStored){
                    res.status(404).send({
                        messaje:'No se guardo el problema'
                    });
                }else{
                    res.status(200).send({
                        Capa:modelStored
                    });
                }
            }
        });
    }else{
        res.status(200).send({
            messaje:'Todos los campos son requeridos'
        });
    }

}


function changeState(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    Problem.findByIdAndUpdate(modelId,toUpdate,{
        new:true
    },(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al actualizar el estado'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha actualizado el Estado'
                });
            }else{
                res.status(200).send({
                    problem:modelUpdated
                });
            }
        }
    });
}



function addMark(req,res){
    var modelId = req.params.id;
    var toUpdate = req.body;

    Mark.findOne({
        _id: toUpdate.mark
    }, (err, modelRes) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error al comprobar la marca'
            });
        } else {
            if (!modelRes) {
                res.status(500).send({
                    messaje: 'No existe la marca'
                });
            } else {
                
                Problem.findByIdAndUpdate(modelId,toUpdate,{
                    new:true
                },(err,modelUpdated)=>{
                    if(err){
                        res.status(500).send({
                            message:'Error al actualizar el problema'
                        });
                    }else{
                        if(!modelUpdated){
                            res.status(404).send({
                                message:'No se ha actualizado el problema'
                            });
                        }else{
                            res.status(200).send({
                                problem:modelUpdated
                            });
                        }
                    }
                });

            }
        }
    });
}


function addProblemType(req, res) {
    var modelId = req.params.id;
    var update = req.body;




    // Setear id de problemType
    ProblemType.findOne({
        name: update.problemType
    }, (err, isMoldel) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error al comprobar el tipo problema'
            });
        } else {
            if (!isMoldel) {
                res.status(500).send({
                    messaje: 'No existe el tipo problema'
                });
            } else {

                update.problemType = isMoldel._id;


                // Añadir problemType en la base de datos        

                Problem.update({
                    _id: modelId
                }, {
                    $addToSet: {
                        problemType: update.problemType
                    }
                }, (err, updated) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            messaje: 'Error al actualizar el problema'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el problema'
                            });
                        } else {
                            res.status(200).send({
                                problem: updated
                            });
                        }
                    }
                });


            }
        }
    });
}



function getProblem(req,res){
    var modelId=req.params.id;

    Problem.findOne({
        _id:modelId
    },(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener los datos del problema'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No existe el problema'
                });
            }else{
                res.status(200).send({
                    Problema:modelRes
                });
            }
        }
    }).populate({
        path:'problemType'
    });
}



function getProblems(req,res){
    Problem.find({},(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener los problemas'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No exixten problemas'
                });
            }else{
                res.status(200).send({
                    Problemas:modelRes
                });
            }
        }
    }).populate({
        path:'problemType'
    });
}

function uploadImage(req, res) {
    var layerId = req.params.id;
    var file_name = 'No Subido';
    //console.log(req.files);
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        
       

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

            //console.log(file_name);
            
            
            Problem.findByIdAndUpdate(layerId,{image:file_name}, {
                new: true
            }, (err, layerUpdated) => {
                if (err) {
                    return res.status(500).send({
                        messaje: 'Error al actualizar el problema'
                    });
                } else {
                    if (!layerUpdated) {
                        res.status(404).send({
                            messaje: 'No se ha podido actualizar el problema'
                        });
                    } else {
                        res.status(200).send({
                            problema: layerUpdated,
                            imagen:file_name
                        });
                    }
                }
            })




        } else {
            fs.unlink(file_path,(err)=>{
                if(err){
                    res.status(200).send({
                        messaje: 'Extencion no valida y fichero no borrado'
                    });
                }else{
                    res.status(200).send({
                        messaje: 'Extencion no valida'
                    });
                }
            });
            
        }
        
    } else {
        res.status(200).send({
            messaje: 'No se ha podido localizar el fichero'
        });
    }
}


function getImageFile(req,res){
    var imageFile=req.params.imageFile;
    var path_File='./uploads/problems/'+imageFile;


    fs.exists(path_File,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_File));
        }else{
            res.status(404).send({
                messaje: 'La imagen no existe'
            });
        }
    })

    
}

module.exports={
    saveProblem,
    changeState,
    addMark,
    addProblemType,
    getProblem,
    getProblems,
    uploadImage,
    getImageFile
}
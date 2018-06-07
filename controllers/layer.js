'use strict'
// Modelos
var Layer = require('../models/layer');

//modulos

var fs=require('fs');
var path=require('path');


function saveLayers(req, res) {
    var layer = new Layer();
    var params = req.body;

    if (params.typeLayer && params.date && params.area && params.red && params.orange &&
        params.yellow && params.green && params.lightgreen && params.average) {
        layer.typeLayer = params.typeLayer;
        layer.image = null;
        layer.date = params.date;
        layer.area = params.area;
        layer.red = params.red;
        layer.orange = params.orange;
        layer.yellow = params.yellow;
        layer.green = params.green;
        layer.lightgreen = params.lightgreen;
        layer.average = params.average;
        
        layer.save((err,modelStored)=>{
            if(err){
                res.status(500).send({
                    messaje:'Error al guardar la capa'
                });
            }else{
                if(!modelStored){
                    res.status(404).send({
                        messaje:'No se guardo la capa'
                    });
                }else{
                    res.status(200).send({
                        Capa:modelStored
                    });
                }
            }
        });
    }else{
        res.status(500).send({messaje:'Todos los datos son requeridos'})
    }
}


function uploadImage(req, res) {
    var layerId = req.params.id;
    var file_name = 'No Subido';
    //console.log(layerId);
    //console.log(req.files);
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        
       

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

            //console.log(file_name);
            
            
            Layer.findByIdAndUpdate(layerId,{image:file_name}, {
                new: true
            }, (err, layerUpdated) => {
                if (err) {
                    return res.status(500).send({
                        messaje: 'Error al actualizar la capa'
                    });
                } else {
                    if (!layerUpdated) {
                        res.status(404).send({
                            messaje: 'No se ha podido actualizar la capa'
                        });
                    } else {
                        
                        res.status(200).send({
                            message:'Archivo subido exitosamente',
                            layer: layerUpdated,
                            image:file_name
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
    var path_File='./uploads/layers/'+imageFile;


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


function deleteLayer(req,res){
    var modelId=req.params.id;
    var toUpdate=req.body;

    Layer.findByIdAndRemove(modelId,{},(err,modelUpdated)=>{
        if(err){
            res.status(500).send({
                message:'Error al eliminar la capa'
            });
        }else{
            if(!modelUpdated){
                res.status(404).send({
                    message:'No se ha eliminado la capa'
                });
            }else{
                res.status(200).send({
                    message:'Capa eliminada'
                });
            }
        }
    });
}


function getLayer(req,res){
    var modelId=req.params.id;

    Layer.findOne({
        _id:modelId
    },(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener los datos de la capa'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No existe la capa'
                });
            }else{
                res.status(200).send({
                    Capa:modelRes
                });
            }
        }
    })
}



function getLayers(req,res){
    Layer.find({},(err,modelRes)=>{
        if(err){
            res.status(500).send({
                message:'Error al obtener las capas'
            });
        }else{
            if(!modelRes){
                res.status(404).send({
                    message:'No exixten capas'
                });
            }else{
                res.status(200).send({
                    Capas:modelRes
                });
            }
        }
    });
}



module.exports={
    saveLayers,
    deleteLayer,
    uploadImage,
    getImageFile,
    getLayer,
    getLayers
};
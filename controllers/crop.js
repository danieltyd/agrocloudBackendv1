'use strict'

var Crop = require('../models/crop');
var CropType = require('../models/cropType');
var Problem = require('../models/problem');
var Flight = require('../models/flight');

function saveCrop(req, res) {
    var crop = new Crop();
    var params = req.body;

    if (params.name && params.position) {
        crop.name = params.name;
        crop.position = params.position;
        crop.cropType = null;
        crop.problem = [];
        crop.flight = [];

        Crop.findOne({
            name: crop.name,
        }, (err, issetCropN) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al obtener datos de Cultivos'
                });
            } else {
                if (!issetCropN) {
                    Crop.findOne({
                        position: crop.position
                    }, (err, issetCrop) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al obtener datos de Cultivos'
                            });
                        } else {
                            if (!issetCrop) {
                                crop.save((err, cropStored) => {
                                    if (err) {
                                        res.status(500).send({
                                            message: 'Error al guardar el cultivo'
                                        });
                                    } else {
                                        if (!cropStored) {
                                            res.status(404).send({
                                                message: 'No se ha guardado el cultivo'
                                            });
                                        } else {
                                            res.status(200).send({
                                                cultivo: cropStored
                                            });
                                        }
                                    }
                                });
                            } else {
                                res.status(200).send({
                                    messaje: 'El cultivo ya se encuentra registrado'
                                });
                            }
                        }
                    });
                } else {
                    res.status(200).send({
                        messaje: 'El cultivo ya se encuentra registrado'
                    });
                }
            }
        })
    } else {
        res.status(200).send({
            messaje: 'Todos los campos son requiridos'
        });
    }
}


function updateCrop(req, res) {
    var modelId = req.params.id;
    var toUpdate = req.body;

    Crop.findByIdAndUpdate(modelId, toUpdate, {
        new: true
    }, (err, modelUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el cultivo'
            });
        } else {
            if (!modelUpdated) {
                res.status(404).send({
                    message: 'No se ha actualizado el cultivo'
                });
            } else {
                res.status(200).send({
                    Cultivo: modelUpdated
                });
            }
        }
    });
}

function deleteCrop(req, res) {
    var modelId = req.params.id;
    var toUpdate = req.body;

    Crop.findByIdAndRemove(modelId, {}, (err, modelUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar el cultivo'
            });
        } else {
            if (!modelUpdated) {
                res.status(404).send({
                    message: 'No se ha eliminado el cultuvo'
                });
            } else {
                res.status(200).send({
                    message: 'Cultivo eliminado'
                });
            }
        }
    });
}


function getCrop(req, res) {
    var modelId = req.params.id;

    Crop.findOne({
        _id: modelId
    }, (err, modelRes) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener los datos del cultivo'
            });
        } else {
            if (!modelRes) {
                res.status(404).send({
                    message: 'No existe el cultivo'
                });
            } else {
                res.status(200).send({
                    Cultivo: modelRes
                });
            }
        }
    }).populate({
        path:'problem'
    }).populate({        
        path:'flight'        
    });
}



function getCrops(req, res) {
    Crop.find({}, (err, modelRes) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener los cultivos'
            });
        } else {
            if (!modelRes) {
                res.status(404).send({
                    message: 'No exixten cultivos'
                });
            } else {
                res.status(200).send({
                    Cultivos: modelRes
                });
            }
        }
    }).populate({
        path:'problem'
    }).populate({        
        path:'flight'        
    });
}



function addProblem(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    Problem.findOne({
        _id:update.problem
    },(err,isProblem)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar el problema'
            });
        }else{
            if(!isProblem){
                return res.status(404).send({
                    messaje: 'Error el NO existe el problema'
                });
            }else{
                Crop.update({
                    _id: modelId
                }, {
                    $addToSet: {
                        problem: update.problem
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar el cultivo'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el cultivo'
                            });
                        } else {
                            res.status(200).send({
                                Cultivo: updated
                            });
                        }
                    }
                });
            }
        }
    });
}


function removeProblem(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    Problem.findOne({
        _id:update.problem
    },(err,isProblem)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar el problema'
            });
        }else{
            if(!isProblem){
                return res.status(404).send({
                    messaje: 'Error el NO existe el problema'
                });
            }else{
                Crop.update({
                    _id: modelId
                }, {
                    $pull: {
                        problem: update.problem
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar el cultivo'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el cultivo'
                            });
                        } else {
                            res.status(200).send({
                                Cultivo: updated
                            });
                        }
                    }
                });
            }
        }
    });
}



function addFlight(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    // Añadir problemType en la base de datos        
    Flight.findOne({
        _id:update.flight
    },(err,isFlight)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar el vuelo'
            });
        }else{
            if(!isFlight){
                return res.status(404).send({
                    messaje: 'Error el NO existe vuelo registrado'
                });
            }else{
                Crop.update({
                    _id: modelId
                }, {
                    $addToSet: {
                        flight: update.flight
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar el cultivo'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el cultivo'
                            });
                        } else {
                            res.status(200).send({
                                Cultivo: updated
                            });
                        }
                    }
                });
            }
        }
    });
}


function removeFlight(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    // Añadir problemType en la base de datos 
    Flight.findOne({
        _id:update.flight
    },(err,isFlight)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar el vuelo'
            });
        }else{
            if(!isFlight){
                return res.status(404).send({
                    messaje: 'Error el NO existe vuelo registrado'
                });
            }else{
                Crop.update({
                    _id: modelId
                }, {
                    $pull: {
                        flight: update.flight
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar el cultivo'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el cultivo'
                            });
                        } else {
                            res.status(200).send({
                                Cultivo: updated
                            });
                        }
                    }
                });
            }
        }
    });        
}


function addCropType(req,res){
    var modelId = req.params.id;
    var update = req.body;

// Setear id de cropType
    CropType.findOne({
        name: update.cropType
    }, (err, isCropT) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error al comprobar el croptype'
            });
        } else {
            if (!isCropT) {
                res.status(500).send({
                    messaje: 'No existe el croptype'
                });
            } else {
                update.cropType = isCropT._id;
                // Actualizar Pkg                
                Crop.findByIdAndUpdate(modelId, update, {
                    new: true
                }, (err, cropUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            messaje: 'Error al actualizar el cultivo'
                        });
                    } else {
                        if (!cropUpdated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el cultivo'
                            });
                        } else {
                            res.status(200).send({
                                Crop: cropUpdated
                            });
                        }
                    }
                }).populate({
                    path: 'problem'
                }).populate({
                    path: 'flight'
                }).populate({
                    path:'cropType'
                });

            }
        }
    });
}



module.exports = {
    saveCrop,
    updateCrop,
    deleteCrop,
    getCrop,
    getCrops,
    addProblem,
    removeProblem,
    addFlight,
    removeFlight,
    addCropType
}
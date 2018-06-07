'use strict'

var Farm = require('../models/farm');
var Crop = require('../models/crop');
var Mark = require('../models/mark');

function saveFarm(req, res) {
    var farm = new Farm();
    var params = req.body;

    if (params.name && params.address && params.area) {
        farm.name = params.name;
        farm.address = params.address;
        farm.area = params.area;
        farm.crop = [];
        farm.mark = [];

        Farm.findOne({
            address: params.address,
        }, (err, issetFarm) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al obtener datos de granja'
                });
            } else {
                if (!issetFarm) {
                    farm.save((err, farmStored) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al guardar datos de granja'
                            });
                        } else {
                            if (!farmStored) {
                                res.status(404).send({
                                    messaje: 'No se guardo los datos de granja'
                                });
                            } else {
                                res.status(200).send({
                                    Granja: farmStored
                                });
                            }
                        }
                    });
                } else {
                    res.status(200).send({
                        messaje: 'La granja ya se encuentra registrada'
                    })
                }
            }
        })

    } else {
        res.status(200).send({
            messaje: 'Todos los campos son requeridos'
        })
    }
}




function updateFarm(req, res) {
    var modelId = req.params.id;
    var toUpdate = req.body;

    Farm.findByIdAndUpdate(modelId, toUpdate, {
        new: true
    }, (err, modelUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar la granja'
            });
        } else {
            if (!modelUpdated) {
                res.status(404).send({
                    message: 'No se ha actualizado la granja'
                });
            } else {
                res.status(200).send({
                    Granja: modelUpdated
                });
            }
        }
    });
}


function deleteFarm(req, res) {
    var modelId = req.params.id;
    var toUpdate = req.body;

    Farm.findByIdAndRemove(modelId, {}, (err, modelUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar la granja'
            });
        } else {
            if (!modelUpdated) {
                res.status(404).send({
                    message: 'No se ha eliminado la granja'
                });
            } else {
                res.status(200).send({
                    message: 'Granja eliminado'
                });
            }
        }
    });
}

function getFarm(req, res) {
    var modelId = req.params.id;

    Farm.findOne({
        _id: modelId
    }, (err, modelRes) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener los datos de la granja'
            });
        } else {
            if (!modelRes) {
                res.status(404).send({
                    message: 'No existe la granja'
                });
            } else {
                res.status(200).send({
                    Granja: modelRes
                });
            }
        }
    }).populate({
        path:'crop'
    }).populate({        
        path:'mark'        
    });
}



function getFarms(req, res) {
    Farm.find({}, (err, modelRes) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener las granjas'
            });
        } else {
            if (!modelRes) {
                res.status(404).send({
                    message: 'No exixten granjas'
                });
            } else {
                res.status(200).send({
                    Granjas: modelRes
                });
            }
        }
    }).populate({
        path:'crop'
    }).populate({        
        path:'mark'        
    });
}


function addCrop(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    Crop.findOne({
        _id:update.crop
    },(err,isCrop)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar el cultivo'
            });
        }else{
            if(!isCrop){
                return res.status(404).send({
                    messaje: 'Error el NO existe el cultivo'
                });
            }else{
                Farm.update({
                    _id: modelId
                }, {
                    $addToSet: {
                        crop: update.crop
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar la granja'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar la granja'
                            });
                        } else {
                            res.status(200).send({
                                Granja: updated
                            });
                        }
                    }
                });
            }
        }
    });
}


function removeCrop(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    Crop.findOne({
        _id:update.crop
    },(err,isCrop)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar el cultivo'
            });
        }else{
            if(!isCrop){
                return res.status(404).send({
                    messaje: 'Error el NO existe el cultivo'
                });
            }else{
                Farm.update({
                    _id: modelId
                }, {
                    $pull: {
                        crop: update.crop
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar la granja'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar la granja'
                            });
                        } else {
                            res.status(200).send({
                                Granja: updated
                            });
                        }
                    }
                });
            }
        }
    });
}




function addMark(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    Mark.findOne({
        _id:update.mark
    },(err,isMark)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar la marca'
            });
        }else{
            if(!isMark){
                return res.status(404).send({
                    messaje: 'Error el NO existe la marca'
                });
            }else{
                Farm.update({
                    _id: modelId
                }, {
                    $addToSet: {
                        mark: update.mark
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar la granja'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar la granja'
                            });
                        } else {
                            res.status(200).send({
                                Granja: updated
                            });
                        }
                    }
                });
            }
        }
    });
}


function removeMark(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    
    Mark.findOne({
        _id:update.mark
    },(err,isCrop)=>{
        if(err){
            return res.status(500).send({
                messaje: 'Error al comprovar la marca'
            });
        }else{
            if(!isCrop){
                return res.status(404).send({
                    messaje: 'Error el NO existe la marca'
                });
            }else{
                Farm.update({
                    _id: modelId
                }, {
                    $pull: {
                        mark: update.mark
                    }
                }, (err, updated) => {
                    if (err) {
                        
                        return res.status(500).send({
                            messaje: 'Error al actualizar la granja'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar la granja'
                            });
                        } else {
                            res.status(200).send({
                                Granja: updated
                            });
                        }
                    }
                });
            }
        }
    });
}


module.exports = {
    saveFarm,
    updateFarm,
    deleteFarm,
    getFarm,
    getFarms,
    addCrop,
    removeCrop,
    addMark,
    removeMark
    
}
'use strict'

var Flight = require('../models/flight');
var Layer = require('../models/flight');
var fs = require("fs");
var moment = require('moment');



var util = require('util')

var multer = require('multer')({
  dest: './uploads/flights/'
});



function saveFlight(req, res) {
    var flight = new Flight();
    var params = req.body;

    if (params.urlName && params.date) {
        flight.urlName = null;
        flight.date = params.date;
        flight.prosseced = true;
        flight.layer = [];


        Flight.findOne({
            urlName: flight.urlName
        }, (err, issetUrl) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al obtener los vuelos'
                });
            } else {
                if (!issetUrl) {
                    flight.save((err, modelStored) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send({
                                messaje: 'Error al guardar el vuelo'
                            });
                        } else {
                            if (!modelStored) {
                                res.status(404).send({
                                    messaje: 'No se guardo el vuelo'
                                });
                            } else {
                                res.status(200).send({
                                    Vuelo: modelStored
                                });
                            }
                        }
                    });
                } else {
                    res.status(200).send({
                        messaje: 'La Url del vuelo ya existe!!'
                    })
                }
            }
        })



    } else {
        res.status(200).send({
            messaje: 'todos los campos son requieridos'
        });
    }
}



function deleteFlight(req, res) {
    var modelId = req.params.id;
    var toUpdate = req.body;

    Flight.findByIdAndRemove(modelId, {}, (err, modelUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al eliminar el vuelo'
            });
        } else {
            if (!modelUpdated) {
                res.status(404).send({
                    message: 'No se ha eliminado el Vuelo'
                });
            } else {
                res.status(200).send({
                    message: 'Vuelo eliminado'
                });
            }
        }
    });
}

function addLayer(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    // Añadir capa en la base de datos

    Layer.findOne({
        _id: update.layer
    }, (err, isLayer) => {
        if (err) {
            res.status(500).send({
                message: 'Error al comprobar Capa'
            });
        } else {
            if (!isLayer) {
                res.status(404).send({
                    message: 'No existe capa'
                });
            } else {
                Flight.update({
                    _id: modelId
                }, {
                    $addToSet: {
                        layer: update.layer
                    }
                }, (err, updated) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            messaje: 'Error al actualizar el vuelo'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el vuelo'
                            });
                        } else {
                            res.status(200).send({
                                vuelo: updated
                            });
                        }
                    }
                });
            }
        }
    })



}

function deleteLayer(req, res) {
    var modelId = req.params.id;
    var update = req.body;
    // Añadir capa en la base de datos  

    Layer.findOne({
        _id: update.layer
    }, (err, isLayer) => {
        if (err) {
            res.status(500).send({
                message: 'Error al comprobar Capa'
            });
        } else {
            if (!isLayer) {
                res.status(404).send({
                    message: 'No existe capa'
                });
            } else {
                Flight.update({
                    _id: modelId
                }, {
                    $pull: {
                        layer: update.layer
                    }
                }, (err, updated) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            messaje: 'Error al actualizar el vuelo'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el vuelo'
                            });
                        } else {
                            res.status(200).send({
                                vuelo: updated
                            });
                        }
                    }
                });
            }
        }
    });
}

function getFlight(req, res) {
    var modelId = req.params.id;

    Flight.findOne({
        _id: modelId
    }, (err, modelRes) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener los datos del vuelo'
            });
        } else {
            if (!modelRes) {
                res.status(404).send({
                    message: 'No existe el vuelo'
                });
            } else {
                res.status(200).send({
                    Vuelo: modelRes
                });
            }
        }
    })
}



function getFlights(req, res) {
    Flight.find({}, (err, modelRes) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener los vuelos'
            });
        } else {
            if (!modelRes) {
                res.status(404).send({
                    message: 'No exixten vuelos'
                });
            } else {
                res.status(200).send({
                    Vuelos: modelRes
                });
            }
        }
    });
}


function uploadScannImages(req, res) {
    var flightId = req.params.id;
    var file_name = 'No Subido';
    var filesPath = 'No path';
    var nuevaCadena;
    
    Flight.findOne({
        _id: flightId
    }, (err, isFlight) => {
        if (err) {
            res.status(500).send({
                message: 'Error al comprobar el vuelo'
            });
        } else {
            if (!isFlight) {
                res.status(404).send({
                    message: 'No existe el vuelo'
                });
            } else {


                var cadena = isFlight.date;
                var patron = "/";
                var nuevoValor = "-";
                nuevaCadena = cadena.replace(patron, nuevoValor);
                nuevaCadena = nuevaCadena.replace(patron, nuevoValor);

                console.log(nuevaCadena);
                fs.mkdir("./uploads/flights/" +flightId+'-'+ nuevaCadena, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("creado");
                });

                Flight.findByIdAndUpdate(flightId, {
                    urlName: './uploads/flights/' +flightId+'-'+ nuevaCadena
                }, {
                    new: true
                }, (err, layerUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            messaje: 'Error al actualizar el vuelo'
                        });
                    } else {
                        if (!layerUpdated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el vuelo'
                            });
                        } else {
                            filesPath = layerUpdated.urlName;
                            if (req.files) {
                                var filesUp = req.files;
                                
                                for (let i in filesUp) {                                    
                                    for (let j in filesUp[i]) {                                        
                                        var file_path = filesUp[i][j].path;
                                        
                                        var file_split = file_path.split('/');
                                        var file_name = filesUp[i][j].name;                                        
                        
                                        var ext_split = file_name.split('\.');
                                        var file_ext = ext_split[1];
                                        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
                                            console.log('nombres '+filesUp[i][j].name);
                                            console.log('subido ' + file_name);
                        
                                            var tmp_path = file_path;                                                                                                                                            
                                            // Ruta donde colocaremos las imagenes
                                            var target_path = './uploads/flights/' +flightId+'-'+nuevaCadena+'/'+ file_name;
                                            // Comprobamos que el fichero es de tipo imagen
                        
                                            // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
                                            fs.rename(tmp_path, target_path, function (err) {
                                                if (err) throw err;
                                                // Eliminamos el fichero temporal
                                                fs.unlink(tmp_path, function () {
                                                    if (err) throw err;
                                                    console.log('Subidos')
                                                });
                                            });                                                                        
                                        } else {
                                            fs.unlink(file_path, (err) => {
                                                if (err) {
                                                    res.status(200).send({
                                                        messaje: 'Extencion no valida y fichero no borrado'
                                                    });
                                                } else {
                                                    res.status(200).send({
                                                        messaje: 'Extencion no valida'
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }

                                res.status(200).send({
                                    flight: layerUpdated
                                });
                        
                            } else {
                                res.status(200).send({
                                    messaje: 'No se ha podido localizar el fichero'
                                });
                            }
                        }
                    }
                });
            }
        }
    });    
}


module.exports = {
    saveFlight,
    deleteFlight,
    addLayer,
    deleteLayer,
    getFlight,
    getFlights,
    uploadScannImages,
    

}
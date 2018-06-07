'use strict'

// MOdelos
var Srv = require('../models/srv');


// Acciones
function saveSrv(req, res) {
    var srv = new Srv();
    var params = req.body;
    
    if (params.name) {
        srv.name = params.name;
        

        // Comprobar q el servicio existe
        Srv.findOne({
            name: srv.name.toLowerCase()
        }, (err, issetSrv) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el Pkg'
                });
            } else {
                if (!issetSrv) {
                     // escribir los datos en la base
                    srv.save((err, srvStored) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al guardar el srv'
                            });
                        } else {
                            if (!srvStored) {
                                res.status(404).send({
                                    messaje: 'No se ha registrado el srv'
                                });
                            } else {
                                res.status(200).send({
                                    srv: srvStored
                                });
                            }
                        }
                    });
                } else {
                    res.status(200).send({
                        messaje: 'El srv no puede registrarse'
                    });
                }
            }
        });
    } else {
        res.status(200).send({
            messaje: 'Introduce los datos correctmente'
        });
    }
}


function updateSrv(req, res) {
    var srvId = req.params.id;
    var update = req.body;




    Srv.findByIdAndUpdate(srvId, update, {
        new: true
    }, (err, srvUpdated) => {
        if (err) {
            return res.status(500).send({
                messaje: 'Error al actualizar srv'
            });
        } else {
            if (!srvUpdated) {
                res.status(404).send({
                    messaje: 'No se ha podido actualizar el srv'
                });
            } else {
                res.status(200).send({
                    user: srvUpdated
                });
            }
        }
    });
}


function deleteSrv(req, res) {
    var srvId = req.params.id;
    var update = req.body;




    Srv.findByIdAndRemove(srvId, {}, (err, srvUpdated) => {
        if (err) {
            return res.status(500).send({
                messaje: 'Error al actualizar srv'
            });
        } else {
            if (!srvUpdated) {
                res.status(404).send({
                    messaje: 'No se ha podido eliminar el srv'
                });
            } else {
                res.status(200).send({
                    messaje: 'Srv eliminado'
                });
            }
        }
    });
}


function getSrv(req, res) {
    var srvId = req.params.id;
    //console.log(pkgId);
    Srv.findOne({
        _id: srvId
    }).exec((err, srvs) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error en la peticion'
            });
        } else {
            if (!srvs) {
                res.status(200).send({
                    messaje: 'No hay pkg'
                });
            } else {
                res.status(200).send({
                    srv: srvs
                });
            }
        }
    });
}
function getSrvs(req, res) {
    Srv.find({}).exec((err, srvs) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error en la peticion'
            });
        } else {
            if (!srvs) {
                res.status(200).send({
                    messaje: 'No hay pkgs'
                });
            } else {
                res.status(200).send({
                    srvs: srvs
                });
            }
        }
    });
}


module.exports = {
    saveSrv,
    updateSrv,
    deleteSrv,
    getSrv,
    getSrvs
}
'use strict'

// MOdelos
var Pkg = require('../models/pkg');


// Acciones
function savePkg(req, res) {
    var pkg = new Pkg();
    var params = req.body;

    if (params.name && params.area && params.price) {
        pkg.name = params.name;
        pkg.area = params.area;
        pkg.price = params.price;

        // escribir los datos en la base
        Pkg.findOne({
            name: pkg.name.toLowerCase()
        }, (err, issetPkg) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el Pkg'
                });
            } else {
                if (!issetPkg) {
                    pkg.save((err, pkgStored) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al guardar el pkg'
                            });
                        } else {
                            if (!pkgStored) {
                                res.status(404).send({
                                    messaje: 'No se ha registrado el pkg'
                                });
                            } else {
                                res.status(200).send({
                                    pkg: pkgStored
                                });
                            }
                        }
                    });
                } else {
                    res.status(200).send({
                        messaje: 'El pkg no puede registrarse'
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


function updatePkg(req, res) {
    var pkgId = req.params.id;
    var update = req.body;




    Pkg.findByIdAndUpdate(pkgId, update, {
        new: true
    }, (err, pkgUpdated) => {
        if (err) {
            return res.status(500).send({
                messaje: 'Error al actualizar usuario'
            });
        } else {
            if (!pkgUpdated) {
                res.status(404).send({
                    messaje: 'No se ha podido actualizar el usuario'
                });
            } else {
                res.status(200).send({
                    user: pkgUpdated
                });
            }
        }
    });
}


function deletePkg(req, res) {
    var pkgId = req.params.id;
    var update = req.body;




    Pkg.findByIdAndRemove(pkgId, {}, (err, pkgUpdated) => {
        if (err) {
            return res.status(500).send({
                messaje: 'Error al actualizar pkg'
            });
        } else {
            if (!pkgUpdated) {
                res.status(404).send({
                    messaje: 'No se ha podido eliminar el pkg'
                });
            } else {
                res.status(200).send({
                    messaje: 'Pkg eliminado'
                });
            }
        }
    });
}


function getPkg(req, res) {
    var pkgId = req.params.id;
    //console.log(pkgId);
    Pkg.find({
        _id: pkgId
    }).exec((err, pkgs) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error en la peticion'
            });
        } else {
            if (!pkgs) {
                res.status(200).send({
                    messaje: 'No hay pkg'
                });
            } else {
                res.status(200).send({
                    pkg: pkgs
                });
            }
        }
    });
}
function getPkgs(req, res) {
    Pkg.find({}).exec((err, pkgs) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error en la peticion'
            });
        } else {
            if (!pkgs) {
                res.status(200).send({
                    messaje: 'No hay pkgs'
                });
            } else {
                res.status(200).send({
                    pkgs: pkgs
                });
            }
        }
    });
}


module.exports = {
    savePkg,
    updatePkg,
    deletePkg,
    getPkg,
    getPkgs
}
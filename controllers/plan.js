'use strict'

// Cargar Modelos
var Plan = require('../models/plan');
var Srv = require('../models/srv');
var Pkg = require('../models/pkg');


function savePlan(req, res) {
    // Crear objeto Plan
    var plan = new Plan();

    // Recoger parametros peticion
    var params = req.body;

    if (params.name && params.price && params.srv && params.pkg) {
        plan.name = params.name;
        plan.price = params.price;
        plan.srv = [];
        plan.pkg = null;


        // Escribir en la base de datos
        Plan.findOne({
            name: plan.name,
        }, (err, issetPlan) => {
            //console.log(issetPlan);
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el Plan'
                });
            } else {
                if (!issetPlan) {
                    plan.save((err, planStored) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al guardar en base'
                            });
                        } else {
                            if (!planStored) {
                                res.status(500).send({
                                    messaje: 'No se ha guardado el plan'
                                });
                            } else {
                                res.status(200).send({
                                    plan: planStored
                                });
                            }
                        }
                    });
                } else {
                    res.status(200).send({
                        messaje: 'El Plan ya existe no puede guardarse'
                    });
                }
            }
        });

    } else {
        res.status(404).send({
            messaje: 'Introduce los datos correctamente'
        });
    }

}

function updatePlan(req, res) {
    var planId = req.params.id;
    var update = req.body;

    Plan.findByIdAndUpdate(planId, update, {
        new: true
    }, (err, planUpdated) => {
        if (err) {
            return res.status(500).send({
                messaje: 'Error al actualizar usuario'
            });
        } else {
            if (!planUpdated) {
                res.status(404).send({
                    messaje: 'No se ha podido actualizar el usuario'
                });
            } else {
                res.status(200).send({
                    plan: planUpdated
                });
            }
        }
    }).populate({
        path: 'srv'
    }).populate({
        path: 'pkg'
    });
}

function deletePlan(req, res) {
    var planId = req.params.id;
    var update = req.body;

    Plan.findByIdAndRemove(planId, {}, (err, planUpdated) => {
        if (err) {
            return res.status(500).send({
                messaje: 'Error al eliminar srv'
            });
        } else {
            if (!planUpdated) {
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

function getPlan(req, res) {
    var planId = req.params.id;
    //console.log(pkgId);
    Plan.findOne({
        _id: planId
    }).populate({
        path: 'srv'
    }).populate({
        path: 'pkg'
    }).exec((err, plans) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error en la peticion'
            });
        } else {
            if (!plans) {
                res.status(200).send({
                    messaje: 'No hay plan'
                });
            } else {
                res.status(200).send({
                    plan: plans
                });
            }
        }
    });
}

function getPlans(req, res) {
    Plan.find({}).populate({
        path: 'srv'
    }).populate({
        path: 'pkg'
    }).exec((err, plans) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error en la peticion'
            });
        } else {
            if (!plans) {
                res.status(200).send({
                    messaje: 'No hay pkgs'
                });
            } else {
                res.status(200).send({
                    planes: plans
                });
            }
        }
    });
}

function addSrv(req, res) {
    var planId = req.params.id;
    var update = req.body;



    // Setear id de srv
    Srv.findOne({
        name: update.srv
    }, (err, isSrv) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error al comprobar el srv'
            });
        } else {
            if (!isSrv) {
                res.status(500).send({
                    messaje: 'No existe el srv'
                });
            } else {

                update.srv = isSrv._id;


                // Añadir Srv en la base de datos

                Plan.update({
                    _id: planId
                }, {
                    $addToSet: {
                        srv: update.srv
                    }
                }, (err, updated) => {
                    if (err) {
                        //console.log(err);
                        return res.status(500).send({
                            messaje: 'Error al actualizar el plan'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el plan'
                            });
                        } else {
                            res.status(200).send({
                                plan: updated
                            });
                        }
                    }
                });


            }
        }
    });
}



function deleteSrv(req, res) {
    var planId = req.params.id;
    var update = req.body;


    Srv.findOne({
        name: update.srv
    }, (err, isSrv) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error al comprobar el srv'
            });
        } else {
            if (!isSrv) {
                res.status(404).send({
                    messaje: 'No existe el srv'
                });
            } else {
                update.srv = isSrv._id;
                // Eliminar el Srv
                Plan.update({
                    _id: planId
                }, {
                    $pull: {
                        srv: update.srv
                    }
                }, (err, updated) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            messaje: 'Error al actualizar el plan'
                        });
                    } else {
                        if (!updated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el plan'
                            });
                        } else {
                            res.status(200).send({
                                plan: updated
                            });
                        }
                    }
                })
            }
        }
    })


}



function updatePkg(req, res) {
    var planId = req.params.id;
    var update = req.body;

    // Setear id de pkg
    Pkg.findOne({
        name: update.pkg
    }, (err, isPkg) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error al comprobar el pkg'
            });
        } else {
            if (!isPkg) {
                res.status(500).send({
                    messaje: 'No existe el Pkg'
                });
            } else {
                update.pkg = isPkg._id;
                // Actualizar Pkg                
                Plan.findByIdAndUpdate(planId, update, {
                    new: true
                }, (err, planUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            messaje: 'Error al actualizar usuario'
                        });
                    } else {
                        if (!planUpdated) {
                            res.status(404).send({
                                messaje: 'No se ha podido actualizar el usuario'
                            });
                        } else {
                            res.status(200).send({
                                plan: planUpdated
                            });
                        }
                    }
                }).populate({
                    path: 'srv'
                }).populate({
                    path: 'pkg'
                });

            }
        }
    });
}


module.exports = {
    savePlan,
    updatePlan,
    deletePlan,
    getPlan,
    getPlans,
    addSrv,
    updatePkg,
    deleteSrv
};
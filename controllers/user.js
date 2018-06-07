'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');
var Plan = require('../models/plan');
var Farm = require('../models/farm');
var Crop = require('../models/crop');
var Pkg = require('../models/pkg');
var Srv = require('../models/srv');
var Flight = require('../models/flight');


// Servicio jwt
var jwt = require('../services/jwt');



//acciones
function pruebas(req, res) {
    res.status(200).send({
        messaje: 'probando el controlador de usuarios y la accion pruebas',
        user: req.user
    });
}


function saveUser(req, res) {
    //crear objeto usuario
    var user = new User();
    var relation = new Relation();

    //recoger parametros peticion
    var params = req.body;


    //asignar valores al objeto susuario
    if (params.password && params.name && params.surname && params.email) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = params.role;
        user.state = params.state;
        user.phone = params.phone;
        user.country = params.country;
        user.city = params.city;
        user.company = params.company;
        user.ruc = params.ruc;
        user.plan = null;
        user.farm = null;
        // Setear id de plan

        // Escribir los datos en la base
        User.findOne({
            email: user.email.toLowerCase()
        }, (err, issetUser) => {
            if (err) {

                res.status(500).send({
                    messaje: 'Error al comprobar el usuario'
                });
            } else {
                if (!issetUser) {
                    // cifrar la contraseña
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        // guardar usuario en db
                        user.save((err, userStored) => {
                            //console.log(userStored);
                            if (err) {
                                //console.log(err);
                                res.status(500).send({
                                    messaje: 'Error al guardar el usuario'
                                });
                            } else {
                                if (!userStored) {
                                    res.status(404).send({
                                        messaje: 'No se ha registrado el usuario'
                                    });
                                } else {
                                    res.status(200).send({
                                        user: userStored
                                    });
                                }
                            }
                        })
                    });
                } else {
                    res.status(200).send({
                        messaje: 'El usuario no puede registrarse'
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            messaje: 'Introduce los datos correctmente'
        });
    }

    //console.log(params);
}




function login(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email.toLowerCase()
    },{
        password:0
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                messaje: 'Error al comprobar el usuario'
            });
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        // comprobar y generar el token
                        if (params.gettoken) {
                            // devolver token jwt
                            res.status(200).send({
                                token: jwt.createToken(user),
                                usuario: user
                            });

                        } else {
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            messaje: 'Contraseña incorrecta'
                        });
                    }
                });

            } else {
                res.status(404).send({
                    messaje: 'Correo incorrecto'
                });

            }
        }
    });
}

function updateUserFarm(req, res) {
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({
            messaje: 'no tienes permiso para Actualizar la granja'
        });
    }

        Farm.findOne({
            _id: update.farm
        }, (err, isFarm) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar la granja'
                });
            } else {
                if (!isFarm) {
                    res.status(500).send({
                        messaje: 'No existe la granja'
                    });
                } else {
                    User.findByIdAndUpdate(userId, update, {
                        new: true
                    }, (err, userUpdated) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al actualizar el usuario'
                            });
                        } else {
                            if (!userUpdated) {
                                res.status(404).send({
                                    messaje: 'No se ha guardado la granja'
                                });
                            } else {
                                res.status(200).send({
                                    user: userUpdated,
                                });
                            }
                        }
                    })
                }
            }
        });
    }


    function updateUserPlan(req, res) {
        var userId = req.params.id;
        var update = req.body;

        if (userId != req.user.sub) {
            return res.status(500).send({
                messaje: 'no tienes permiso para Actualizar el plan'
            });
        }

        Plan.findOne({
            name: update.plan
        }, (err, isPlan) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el plan'
                });
            } else {
                if (!isPlan) {
                    res.status(500).send({
                        messaje: 'No existe el plan'
                    });
                } else {
                    update.plan = isPlan._id;
                    User.findByIdAndUpdate(userId, update, {
                        new: true
                    }, (err, userUpdated) => {
                        if (err) {
                            return res.status(500).send({
                                messaje: 'Error al actualizar usuario'
                            });
                        } else {
                            if (!userUpdated) {
                                res.status(404).send({
                                    messaje: 'No se ha podido actualizar el usuario'
                                });
                            } else {
                                res.status(200).send({
                                    user: userUpdated,
                                });
                            }
                        }
                    }).populate({
                        path: 'plan'
                    })



                }
            }
        });
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var update = req.body;



        if (userId != req.user.sub) {
            return res.status(500).send({
                messaje: 'no tienes permiso para actualizar el usuario'
            });
        }

        if (req.body.plan) {
            Plan.findOne({
                name: update.plan
            }, (err, isPlan) => {
                if (err) {
                    res.status(500).send({
                        messaje: 'Error al comprobar el plan'
                    });
                } else {
                    if (!isPlan) {
                        res.status(500).send({
                            messaje: 'No existe el plan'
                        });
                    } else {
                        update.plan = isPlan._id;



                        User.findByIdAndUpdate(userId, update, {
                            new: true
                        }, (err, userUpdated) => {
                            if (err) {
                                return res.status(500).send({
                                    messaje: 'Error al actualizar usuario'
                                });
                            } else {
                                if (!userUpdated) {
                                    res.status(404).send({
                                        messaje: 'No se ha podido actualizar el usuario'
                                    });
                                } else {
                                    res.status(200).send({
                                        user: userUpdated
                                    });
                                }
                            }
                        }).populate({
                            path: 'plan'
                        })



                    }
                }
            });
        } else {
            User.findByIdAndUpdate(userId, update, {
                new: true
            }, (err, userUpdated) => {
                if (err) {
                    return res.status(500).send({
                        messaje: 'Error al actualizar usuario'
                    });
                } else {
                    if (!userUpdated) {
                        res.status(404).send({
                            messaje: 'No se ha podido actualizar el usuario'
                        });
                    } else {
                        res.status(200).send({
                            user: userUpdated
                        });
                    }
                }
            }).populate({
                path: 'plan'
            });
        }
    }


    function getOneUser(req, res) {
        var userId = req.params.id;
        if (userId != req.user.sub) {
            return res.status(500).send({
                messaje: 'no tienes permiso para ver el usuario'
            });
        }

        User.find({
            _id: userId
        }, (err, users) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error en la peticion'
                });
            } else {
                if (!users) {
                    res.status(200).send({
                        messaje: 'No hay cuidadores'
                    });
                } else {
                    res.status(200).send({
                        user: users
                    });
                }
            }
        }).populate({
            path: 'plan'
        }).populate({
            path: 'farm'
        });
    }


    function getUsers(req, res) {
        
        
        User.find({
            role: 'ROLE_USER'
        }).populate({
            path: 'plan'
        }).exec((err, users) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error en la peticion'
                });
            } else {
                if (!users) {
                    res.status(200).send({
                        messaje: 'No hay cuidadores'
                    });
                } else {
                    res.status(200).send({
                        user: users
                    });
                }
            }
        });
    }


    function getAlly(req, res) {


        User.find({
            role: 'ROLE_ALLY'
        }).populate({
            path: 'plan'
        }).exec((err, users) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error en la peticion'
                });
            } else {
                if (!users) {
                    res.status(200).send({
                        messaje: 'No hay cuidadores'
                    });
                } else {
                    res.status(200).send({
                        user: users
                    });
                }
            }
        });
    }

    function getOfficeOperators(req, res) {
        User.find({
            role: 'ROLE_OFFICE_OPERATOR'
        }).populate({
            path: 'plan'
        }).exec((err, users) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error en la peticion'
                });
            } else {
                if (!users) {
                    res.status(200).send({
                        messaje: 'No hay cuidadores'
                    });
                } else {
                    res.status(200).send({
                        user: users
                    });
                }
            }
        });
    }

    function getCampOperator(req, res) {
        User.find({
            role: 'ROLE_CAMP_OPERATOR'
        }).populate({
            path: 'plan'
        }).exec((err, users) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error en la peticion'
                });
            } else {
                if (!users) {
                    res.status(200).send({
                        messaje: 'No hay cuidadores'
                    });
                } else {
                    res.status(200).send({
                        user: users
                    });
                }
            }
        });
    }

    function getAllUsers(req, res) {
        User.find({}).populate({
            path: 'plan'
        }).exec((err, users) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error en la peticion'
                });
            } else {
                if (!users) {
                    res.status(200).send({
                        messaje: 'No hay cuidadores'
                    });
                } else {
                    res.status(200).send({
                        user: users
                    });
                }
            }
        });
    }

    function addPlan(req, res) {
        var userId = req.params.id;
        var update = req.body;
        var user = req.user;
        var planU;

        if (userId != req.user.sub) {
            return res.status(500).send({
                messaje: 'no tienes permiso para actualizar el usuario'
            });
        }
        // Setear id de plan
        Plan.findOne({
            name: update.plan
        }, (err, isPlan) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el plan'
                });
            } else {
                if (!isPlan) {
                    res.status(500).send({
                        messaje: 'No existe el plan'
                    });
                } else {
                    update.plan = isPlan._id;
                    //Añadir elementos a cualquier documento                
                    User.update({
                        _id: userId
                    }, {
                        $addToSet: update
                    }, (err, update) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send({
                                messaje: 'Error al actualizar usuario'
                            });
                        } else {
                            if (!update) {
                                res.status(404).send({
                                    messaje: 'No se ha podido actualizar el usuario'
                                });
                            } else {
                                res.status(200).send({
                                    user: update
                                });
                            }
                        }
                    })

                }
            }
        });
    }
    //===============Metodos de consulta relacionados================================================================================


    function getUserPlan(req, res) {
        var userId = req.params.id;
        

        User.find({
            _id: userId
        }, {
            plan: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {
                    res.status(200).send({
                        UserPlan: isUser
                    });
                }
            }
        });
    }

    function getUserFarm(req, res) {
        var userId = req.params.id;

        User.find({
            _id: userId
        }, {
            farm: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {
                    res.status(200).send({
                        UserFarm: isUser
                    });
                }
            }
        });
    }



    function getUserPkg(req, res) {
        var userId = req.params.id;

        User.find({
            _id: userId
        }, {
            _id: 0,
            plan: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {

                    Plan.find({
                        _id: isUser[0].plan
                    }, {
                        _id: 0,
                        pkg: 1
                    }, (err, isPlan) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al comprobar el Plan'
                            });
                        } else {
                            if (!isPlan) {
                                res.status(404).send({
                                    messaje: 'No existe el plan'
                                });
                            } else {
                                res.status(200).send({
                                    pkg: isPlan[0].pkg
                                });
                            }
                        }
                    }).populate({
                        path: 'pkg'
                    });
                }
            }
        });
    }




    function getUserSrvs(req, res) {
        var userId = req.params.id;

        User.find({
            _id: userId
        }, {
            _id: 0,
            plan: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {

                    Plan.find({
                        _id: isUser[0].plan
                    }, {
                        _id: 0,
                        srv: 1
                    }, (err, isPlan) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al comprobar el Plan'
                            });
                        } else {
                            if (!isPlan) {
                                res.status(404).send({
                                    messaje: 'No existe el plan'
                                });
                            } else {
                                res.status(200).send({
                                    serv: isPlan[0].srv
                                });
                            }
                        }
                    }).populate({
                        path: 'srv'
                    });
                }
            }
        });
    }

    function getUserCrops(req, res) {
        var userId = req.params.id;

        User.find({
            _id: userId
        }, {
            _id: 0,
            farm: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {
                    Farm.find({
                        _id: isUser[0].farm
                    }, {
                        _id: 0,
                        crop: 1
                    }, (err, isFarm) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al comprobar la granja'
                            });
                        } else {
                            if (!isFarm) {
                                res.status(404).send({
                                    messaje: 'No existe la granja'
                                });
                            } else {
                                res.status(200).send({
                                    crops: isFarm[0].crop
                                });
                            }
                        }
                    })
                }
            }
        });

    }

    function getUserMarks(req, res) {
        var userId = req.params.id;

        User.find({
            _id: userId
        }, {
            _id: 0,
            farm: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {
                    Farm.find({
                        _id: isUser[0].farm
                    }, {
                        _id: 0,
                        mark: 1
                    }, (err, isFarm) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al comprobar la granja'
                            });
                        } else {
                            if (!isFarm) {
                                res.status(404).send({
                                    messaje: 'No existe la granja'
                                });
                            } else {
                                res.status(200).send({
                                    marks: isFarm[0].mark
                                });
                            }
                        }
                    })
                }
            }
        });

    }





    function getUserFlights(req, res) {
        var userId = req.params.id;

        User.find({
            _id: userId
        }, {
            _id: 0,
            farm: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {
                    Farm.find({
                        _id: isUser[0].farm
                    }, {
                        _id: 0,
                        crop: 1
                    }, (err, isFarm) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al comprobar la granja'
                            });
                        } else {
                            if (!isFarm) {
                                res.status(404).send({
                                    messaje: 'No existe la granja'
                                });
                            } else {
                                //console.log(isFarm[0].crop);
                                Crop.find({
                                    _id: isFarm[0].crop
                                }, {
                                    _id: 0,
                                    flight: 1
                                }, (err, isCrop) => {
                                    if (err) {
                                        res.status(500).send({
                                            messaje: 'Error al comprobar la granja'
                                        });
                                    } else {
                                        if (!isCrop) {
                                            res.status(404).send({
                                                messaje: 'No existe cultivo'
                                            });
                                        } else {
                                            res.status(200).send({
                                                vuelos: isCrop
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    });
                }
            }
        });

    }







    function getUserProblems(req, res) {
        var userId = req.params.id;

        User.find({
            _id: userId
        }, {
            _id: 0,
            farm: 1
        }, (err, isUser) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al comprobar el usuario'
                });
            } else {
                if (!isUser) {
                    res.status(404).send({
                        messaje: 'No existe el usuario'
                    });
                } else {
                    Farm.find({
                        _id: isUser[0].farm
                    }, {
                        _id: 0,
                        crop: 1
                    }, (err, isFarm) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al comprobar la granja'
                            });
                        } else {
                            if (!isFarm) {
                                res.status(404).send({
                                    messaje: 'No existe la granja'
                                });
                            } else {
                                Crop.find({
                                    _id: isFarm[0].crop
                                }, {
                                    _id: 0,
                                    problem: 1
                                }, (err, isCrop) => {
                                    if (err) {
                                        res.status(500).send({
                                            messaje: 'Error al comprobar la granja'
                                        });
                                    } else {
                                        if (!isCrop) {
                                            res.status(404).send({
                                                messaje: 'No existe cultivo'
                                            });
                                        } else {
                                            res.status(200).send({
                                                problemas: isCrop
                                            })

                                        }
                                    }
                                }).populate({
                                    path: 'problem'
                                })
                            }
                        }
                    });
                }
            }
        });

    }

    function getUserAlly(req, res) {
        var userId = req.params.id;
        var params = req.body;
        User.find({
            _id: userId
        }, {
            _id: 0,
            company: 1
        }, (err, isAlly) => {
            if (err) {
                res.status(500).send({
                    messaje: 'Error al buscar usuario'
                });
            } else {
                if (!isAlly) {
                    res.status(404).send({
                        messaje: 'No existe el Aliado'
                    });
                } else {

                    User.find({
                        company: isAlly[0].company
                    }, (err, foundUsers) => {
                        if (err) {
                            res.status(500).send({
                                messaje: 'Error al buscar usuarios'
                            });
                        } else {
                            if (!foundUsers) {
                                res.status(404).send({
                                    messaje: 'No se han encoantrado suarios de aliado'
                                });
                            } else {
                                res.status(200).send({
                                    Users: foundUsers
                                });
                            }
                        }
                    });
                }
            }
        });
    }

    module.exports = {
        pruebas,
        saveUser,
        login,
        updateUser,
        updateUserPlan,
        updateUserFarm,
        getUsers,
        getAlly,
        getCampOperator,
        getOfficeOperators,
        getAllUsers,
        getOneUser,
        getUserPlan,
        getUserFarm,
        getUserPkg,
        getUserSrvs,
        getUserCrops,
        getUserMarks,
        getUserFlights,
        getUserProblems,
        getUserAlly
    };
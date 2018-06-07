'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_user = require('../middlewares/isUser');

api.post('/saveUser', UserController.saveUser);
api.post('/saveUserAlly', [md_auth.ensureAuth, md_user.isAdmin], UserController.saveUser);
api.post('/login', UserController.login);
api.put('/updateUser/:id', [md_auth.ensureAuth, md_user.isClient], UserController.updateUser);
api.put('/updateUserPlan/:id', [md_auth.ensureAuth, md_user.isClient], UserController.updateUserPlan);
api.put('/updateUserFarm/:id', [md_auth.ensureAuth, md_user.isClient], UserController.updateUserFarm);
api.get('/getUsers', [md_auth.ensureAuth, md_user.isAdmin], UserController.getUsers);
api.get('/getAlly', [md_auth.ensureAuth, md_user.isAdmin], UserController.getAlly);
api.get('/getCampOperators', [md_auth.ensureAuth, md_user.isAdmin], UserController.getCampOperator);
api.get('/getOfficeOperators', [md_auth.ensureAuth, md_user.isAdmin], UserController.getOfficeOperators);
api.get('/getAllUsers',  UserController.getAllUsers);

api.get('/getOneUser/:id', [md_auth.ensureAuth, md_user.isClient], UserController.getOneUser);
api.get('/getUserPlan/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserPlan);
api.get('/getUserFarm/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserFarm);
api.get('/getUserPkg/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserPkg);
api.get('/getUserSrvs/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserSrvs);
api.get('/getUserCrops/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserCrops);
api.get('/getUserMarks/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserMarks);
api.get('/getUserFlights/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserFlights);
api.get('/getUserProblems/:id', [md_auth.ensureAuth, md_user.isClient, md_user.isAdmin], UserController.getUserProblems);
api.get('/getUserAlly/:id', [md_auth.ensureAuth, md_user.isAlly, md_user.isAdmin], UserController.getUserAlly);

module.exports = api;
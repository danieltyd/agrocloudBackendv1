'use strict'

var express=require('express');
var cropController=require('../controllers/crop');

var api=express.Router();
var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');

api.post('/saveCrop',[md_auth.ensureAuth,md_user.isClient], cropController.saveCrop);
api.put('/updateCrop/:id',[md_auth.ensureAuth,md_user.isClient],cropController.updateCrop);
api.delete('/deleteCrop/:id',[md_auth.ensureAuth,md_user.isClient],cropController.deleteCrop);
api.get('/getCrop/:id',[md_auth.ensureAuth,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator,md_user.isClient],cropController.getCrop);
api.get('/getCrops',[md_auth.ensureAuth,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator,md_user.isClient],cropController.getCrops);
api.put('/addProblem/:id',[md_auth.ensureAuth,md_user.isClient],cropController.addProblem);
api.put('/removeProblem/:id',[md_auth.ensureAuth,md_user.isClient],cropController.removeProblem);
api.put('/addFlight/:id',[md_auth.ensureAuth,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator],cropController.addFlight);
api.put('/removeFlight/:id',[md_auth.ensureAuth,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator],cropController.removeFlight);
api.put('/addCropType/:id',[md_auth.ensureAuth,md_user.isClient],cropController.addCropType);



module.exports=api;

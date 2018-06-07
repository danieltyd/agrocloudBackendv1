'use strict'

var express=require('express');
var CropTypeController=require('../controllers/cropType');
var api=express.Router();
var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');

api.post('/saveCropType',[md_auth.ensureAuth,md_user.isClient],CropTypeController.saveCropType);
api.put('/updateCropType/:id',[md_auth.ensureAuth,md_user.isClient],CropTypeController.updateCropType);
api.delete('/deleteCropType/:id',[md_auth.ensureAuth,md_user.isClient],CropTypeController.deleteCropType);
api.get('/getCropType/:id',[md_auth.ensureAuth,md_user.isClient],CropTypeController.getCropType);
api.get('/getCropTypes',[md_auth.ensureAuth,md_user.isClient],CropTypeController.getCropTypes);


module.exports=api;
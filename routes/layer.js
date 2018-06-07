'use strict'

var express=require('express');
var layerController=require('../controllers/layer');

var api=express.Router();
var md_auth=require('../middlewares/authenticated');


var multipart=require('connect-multiparty');
var md_upload=multipart({ uploadDir:'./uploads/layers' });
var md_user=require('../middlewares/isUser');



api.post('/saveLayer',[md_auth.ensureAuth,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator], layerController.saveLayers);
api.post('/upload-image-layer/:id',[md_auth.ensureAuth,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator,md_upload], layerController.uploadImage);
api.get('/get-image-layer/:imageFile',[md_auth.ensureAuth,md_user.isClient,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator,md_user.isAdmin], layerController.getImageFile);
api.delete('/deleteLayer/:id',[md_auth.ensureAuth,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator,md_user.isAdmin],layerController.deleteLayer);
api.get('/getlayer/:id',[md_auth.ensureAuth,md_user.isClient,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator], layerController.getLayer);
api.get('/getlayers',[md_auth.ensureAuth,md_user.isClient,md_user.isAdmin,md_user.isAlly,md_user.isCampOperator,md_user.isOfficeOperator], layerController.getLayers);



module.exports=api;

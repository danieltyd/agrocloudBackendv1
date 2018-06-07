'use strict'

var express=require('express');
var problemController=require('../controllers/problem');

var api=express.Router();
var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');

var multipart=require('connect-multiparty');
var md_upload=multipart({ uploadDir:'./uploads/problems' });




api.post('/saveProblem',[md_auth.ensureAuth,md_user.isClient], problemController.saveProblem);
api.put('/changeState/:id',[md_auth.ensureAuth,md_user.isClient],problemController.changeState);
api.put('/addMark/:id',[md_auth.ensureAuth,md_user.isClient],problemController.addMark);
api.put('/addProblemType/:id',[md_auth.ensureAuth,md_user.isClient],problemController.addProblemType);
api.get('/getProblem/:id',[md_auth.ensureAuth,md_user.isClient,md_user.isAdmin],problemController.getProblem);
api.get('/getProblems',[md_auth.ensureAuth,md_user.isClient,md_user.isAdmin],problemController.getProblems);


api.post('/upload-image-problem/:id',[md_auth.ensureAuth,md_user.isClient,md_upload], problemController.uploadImage);
api.get('/get-image-problem/:imageFile',[md_auth.ensureAuth,md_user.isClient,md_user.isAdmin], problemController.getImageFile);


module.exports=api;

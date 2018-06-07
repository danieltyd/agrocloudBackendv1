'use strict'

var express=require('express');
var MarkController=require('../controllers/mark');
var api=express.Router();
var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');

api.post('/saveMark',[md_auth.ensureAuth,md_user.isClient],MarkController.saveMark);
api.put('/updateMark/:id',[md_auth.ensureAuth,md_user.isClient],MarkController.updateMark);
api.delete('/deleteMark/:id',[md_auth.ensureAuth,md_user.isClient],MarkController.deleteMark);
api.get('/getMark/:id',[md_auth.ensureAuth,md_user.isClient],MarkController.getMark);
api.get('/getMarks',[md_auth.ensureAuth,md_user.isClient],MarkController.getMarks);


module.exports=api;
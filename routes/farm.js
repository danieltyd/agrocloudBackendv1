'use strict'

var express=require('express');
var FarmController=require('../controllers/farm');

var api=express.Router();
var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');

api.post('/saveFarm',[md_auth.ensureAuth,md_user.isClient], FarmController.saveFarm);
api.put('/updateFarm/:id',[md_auth.ensureAuth,md_user.isClient],FarmController.updateFarm);
api.delete('/deleteFarm/:id',[md_auth.ensureAuth,md_user.isClient],FarmController.deleteFarm);
api.get('/getFarm/:id',[md_auth.ensureAuth,md_user.isClient],FarmController.getFarm);
api.get('/getFarms',[md_auth.ensureAuth,md_user.isClient],FarmController.getFarms);
api.put('/addCrop/:id',[md_auth.ensureAuth,md_user.isClient],FarmController.addCrop);
api.put('/addMarkFarm/:id',[md_auth.ensureAuth,md_user.isClient],FarmController.addMark);
api.put('/removeMarkFarm/:id',[md_auth.ensureAuth,md_user.isClient],FarmController.removeMark);
api.put('/removeCrop/:id',[md_auth.ensureAuth,md_user.isClient],FarmController.removeCrop);





module.exports=api;
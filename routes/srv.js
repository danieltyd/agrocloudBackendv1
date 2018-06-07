'use strict'

var express=require('express');

var SrvController=require('../controllers/srv');

var api=express.Router();

var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');


api.post('/saveSrv',[md_auth.ensureAuth,md_user.isAdmin],SrvController.saveSrv);
api.put('/updateSrv/:id',[md_auth.ensureAuth,md_user.isAdmin],SrvController.updateSrv);
api.delete('/deleteSrv/:id',[md_auth.ensureAuth,md_user.isAdmin],SrvController.deleteSrv);
api.get('/getSrv/:id',[md_auth.ensureAuth,md_user.isAdmin],SrvController.getSrv);
api.get('/getSrvs',[md_auth.ensureAuth,md_user.isAdmin],SrvController.getSrvs);

module.exports=api;

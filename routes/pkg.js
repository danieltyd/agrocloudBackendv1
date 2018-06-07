'use strict'

var express=require('express');

var PkgController=require('../controllers/pkg');

var api=express.Router();

var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');


api.post('/savePkg',[md_auth.ensureAuth,md_user.isAdmin],PkgController.savePkg);
api.put('/updatePkg/:id',[md_auth.ensureAuth,md_user.isAdmin],PkgController.updatePkg);
api.delete('/deletePkg/:id',[md_auth.ensureAuth,md_user.isAdmin],PkgController.deletePkg);
api.get('/getPkg/:id',[md_auth.ensureAuth,md_user.isAdmin],PkgController.getPkg);
api.get('/getPkgs',[md_auth.ensureAuth,md_user.isAdmin],PkgController.getPkgs);

module.exports=api;

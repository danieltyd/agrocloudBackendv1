'use strict'

var express=require('express');
var ProblemTController=require('../controllers/problemType');
var api=express.Router();
var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');

api.post('/saveProblemType',[md_auth.ensureAuth,md_user.isClient],ProblemTController.saveProblemT);
api.put('/updateProblemT/:id',[md_auth.ensureAuth,md_user.isClient],ProblemTController.updateProblemT);
api.delete('/deleteProblemT/:id',[md_auth.ensureAuth,md_user.isClient],ProblemTController.deleteProblemT);
api.get('/getProblemT/:id',[md_auth.ensureAuth,md_user.isClient],ProblemTController.getProblemT);
api.get('/getProblemTs',[md_auth.ensureAuth,md_user.isClient],ProblemTController.getProblemTs);


module.exports=api;
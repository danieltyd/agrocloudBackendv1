'user strict'

var express=require('express');

var PlanController=require('../controllers/plan');

var api=express.Router();

var md_auth=require('../middlewares/authenticated');
var md_user=require('../middlewares/isUser');

api.post('/savePlan',[md_auth.ensureAuth,md_user.isAdmin],PlanController.savePlan);
api.put('/updatePlan/:id',[md_auth.ensureAuth,md_user.isAdmin],PlanController.updatePlan);
api.delete('/deletePlan/:id',[md_auth.ensureAuth,md_user.isAdmin],PlanController.deletePlan);
api.get('/getPlan/:id',[md_auth.ensureAuth,md_user.isAdmin,md_user.isClient],PlanController.getPlan);
api.get('/getPlans',PlanController.getPlans);
api.put('/addSrv/:id',[md_auth.ensureAuth,md_user.isAdmin],PlanController.addSrv);
api.put('/updatePkg/:id',[md_auth.ensureAuth,md_user.isAlly,md_user.isClient],PlanController.updatePkg);
api.delete('/deleteSrv/:id',[md_auth.ensureAuth,md_user.isAdmin],PlanController.deleteSrv);

module.exports=api;
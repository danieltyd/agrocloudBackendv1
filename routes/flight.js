'use strict'

var express = require('express');
var flightController = require('../controllers/flight');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_user = require('../middlewares/isUser');


var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/flights/'
});


api.post('/saveFlight', [md_auth.ensureAuth, md_user.isAdmin, md_user.isAlly, md_user.isCampOperator, md_user.isOfficeOperator], flightController.saveFlight);
api.delete('/deleteFlight/:id', [md_auth.ensureAuth, md_user.isAdmin, md_user.isAlly, md_user.isCampOperator, md_user.isOfficeOperator], flightController.deleteFlight);
api.put('/addFlightLayer/:id', [md_auth.ensureAuth, md_user.isAdmin, md_user.isAlly, md_user.isCampOperator, md_user.isOfficeOperator], flightController.addLayer);
api.delete('/deleteFlightLayer/:id', [md_auth.ensureAuth, md_user.isAdmin, md_user.isAlly, md_user.isCampOperator, md_user.isOfficeOperator], flightController.deleteLayer);
api.get('/getFlight/:id', [md_auth.ensureAuth, md_user.isAdmin, md_user.isAlly, md_user.isCampOperator, md_user.isOfficeOperator, md_user.isClient], flightController.getFlight);
api.get('/getFlights', [md_auth.ensureAuth, md_user.isAdmin, md_user.isAlly, md_user.isCampOperator, md_user.isOfficeOperator, md_user.isClient], flightController.getFlights);
api.put('/uploadScannImages/:id', [md_upload], flightController.uploadScannImages);

module.exports = api;
'use strict'

var express=require('express');
var bodyParser=require('body-parser');

var app=express();

// Cargar Rutas
var plan_routes=require('./routes/plan');
var user_routes=require('./routes/user');
var pkg_routes=require('./routes/pkg');
var srv_routes=require('./routes/srv');
var problemType_routes=require('./routes/problemType');
var mark_routes=require('./routes/mark');
var cropType_routes=require('./routes/cropType');
var layer_routes=require('./routes/layer');
var problem_routes=require('./routes/problem');
var flight_routes=require('./routes/flight');
var crop_routes=require('./routes/crop');
var farm_routes=require('./routes/farm');
var formidable=require('express-formidable');

// Middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Acces-Control-Allow-Request-Method');
    res.header('Acces-Control-Allow_Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next(); 
 });

// Configurar formidable
//app.use(formidable.parse({ keepExtensions:true }));


// Rutas base
app.use('/api',plan_routes);
app.use('/api',user_routes);
app.use('/api',pkg_routes);
app.use('/api',srv_routes);
app.use('/api',problemType_routes);
app.use('/api',mark_routes);
app.use('/api',cropType_routes);
app.use('/api',layer_routes);
app.use('/api',problem_routes);
app.use('/api',flight_routes);
app.use('/api',crop_routes);
app.use('/api',farm_routes);

module.exports=app;



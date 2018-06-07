'use strict'

var mongoose=require('mongoose');

var app=require('./app');
var port=process.env.port || 3789;

mongoose.Promise=global.Promise;

//conexion base local
//'mongodb://localhost:27017/baseV1_0'

//conexion a cluster en Mongodb Atlas
//'mongodb://mongodb-stitch-app1-iwdtw:1357242qWe@cluster0-shard-00-00-dhxdl.mongodb.net:27017,cluster0-shard-00-01-dhxdl.mongodb.net:27017,cluster0-shard-00-02-dhxdl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'



mongoose.connect('mongodb://localhost:27017/baseV1_0',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log('Conexion a la base de Datos correcta!!...');
        app.listen(port, ()=>{
            console.log('El servior local esta corriendo correctamente en el puerto '+port+' !!...')
        });
    }
});

/*var conn = mongoose.connection;
var Grid = require('gridfs-stream');
var fs = require('fs');
Grid.mongo = mongoose.mongo;

conn.once('open', function () {
    console.log('open');
    var gfs = Grid(conn.db);
 
    // streaming to gridfs
    //filename to store in mongodb
    var writestream = gfs.createWriteStream({
        filename: 'mongo_file.png'
    });
    fs.createReadStream('./uploads/layers/CLOROFILA_BANANO_3.png').pipe(writestream);
 
    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
    });

    

});*/



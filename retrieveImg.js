/*'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port = process.env.port || 3789;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/baseV1_0'
mongoose.connect('mongodb://localhost:27017/gridfs1', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexion a la base de Datos correcta!!...');
        app.listen(port, () => {
            console.log('El servior local esta corriendo correctamente!!...')
        })
    }
});

var conn = mongoose.connection;
var Grid = require('gridfs-stream');
var fs = require('fs');
var path = require('path');
Grid.mongo = mongoose.mongo;

conn.once('open', function () {
    console.log('open');
    var gfs = Grid(conn.db);

    // streaming to gridfs
    //filename to store in mongodb
    var fs_write_stream = fs.createWriteStream(path.join(__dirname, './downloads/img1.png'));
    //read from mongodb
    var readstream = gfs.createReadStream({
        filename: 'mongo_file.png'
    });
    readstream.pipe(fs_write_stream);
    fs_write_stream.on('close', function () {
        console.log('file has been written fully!');
    });



});*/
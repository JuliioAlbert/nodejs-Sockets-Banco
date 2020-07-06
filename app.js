const express = require('express');
const path = require('path');
const http = require('http');
const Socket = require('socket.io');

const app = express();

let server = http.createServer(app);
const publico = path.resolve(__dirname, './public');

//IO = esta el comucion del Backend
module.exports.io = Socket(server);
require('./sockets/socket');

//Permitir Publico
app.use(express.static(publico));
//Puerto del Servidor 
const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log('Corriendo en puerto', port);
});

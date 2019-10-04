require('./config/db'); //Llamando conexion a la BD
require('./config/keys'); //Informando a heroku de las Variables De E.

// Conexion Sockets De lado del servidor
const newConnect = require('./sockets');

// Modules Natives Nodejs
const http = require('http');
const path = require('path');

// Debe existir un servidor para que funcione socket.io
const express = require('express');
const socketio = require('socket.io');

// Initial....
const app = express();

// Settings
// app.set('port', process.env.PORT || 3000);

// Socket.io ya puede escuhar el servidor creado y se
// puede establecer una conexión en tiempo real.
const server = http.createServer(app);
const io = socketio.listen(server);

// Escucha de forma permanente cuando haya una nueva conexion
// de un cliente o socket como io le conoce.
newConnect(io);
//Es lo mismo arriba y abajo solo mas pro abajo.
//require('./sockets')(io);

// static files
app.use(express.static(path.join(__dirname, 'public/')));

// Starting the server
server.listen(process.env.PORT, () => {
    console.log('Server On Port', process.env.PORT);
});
const Chat = require('./models/messageChat');

// Conexion del socket del cliente.
module.exports = (io) => {

    // Utilizando memoria de mi servidor
    // ya que no estoy utilizando una BD
    let nickNames = [];

    // io tiene a todos los usuarios conectados en el servidor.
    io.on('connection', async(socket) => {
        /* ---------------------------------------------------------- */
        // console.log('nuevo usuario(socket) conectado');
        let messages = await Chat.find({}).limit(3);
        socket.emit('load old messages', messages);
        /* ---------------------------------------------------------- */

        /* ---------------------------------------------------------- */
        /* Users */
        socket.on('new user', (data, cb) => {
            if (nickNames.indexOf(data) != (-1)) {
                cb(false);
            } else {
                cb(true);

                //el SOCKET en si; es un objeto con métodos y propiedades.
                // En la propia conexion de socket estoy guardando
                // el nombre que me envia el cliente en la propiedad del
                // socket nickname.
                socket.nickName = data;
                nickNames.push(socket.nickName);
                updateNickNames();
            }
            /* ---------------------------------------------------------- */
        });

        /* ---------------------------------------------------------- */
        // Este es el nombre del mensaje del cliente
        // que recibe el parametro de la funciton.
        socket.on('send message', async(data) => {

            // Guardando los mensajes en la BD
            let chat = new Chat({
                message: data,
                nick: socket.nickName
            });
            await chat.save();

            // retrasmitelo a todos los clientes.
            // Despues de recibir el dato debo retrasmitirlo
            // a todos los usuarios conectados en la aplicación.
            io.sockets.emit('new message', {
                message: data,
                nick: socket.nickName
            });
            /* ---------------------------------------------------------- */
        });

        /* ---------------------------------------------------------- */
        // Cuando un socket o usuario se ha desconectado
        socket.on('disconnect', data => {
            if (!socket.nickName || socket.nickName)
                nickNames.splice(nickNames.indexOf(socket.nickName), 1);
            updateNickNames();
        });

        let updateNickNames = () => {
                io.sockets.emit('usernames', nickNames);
            }
            /* ---------------------------------------------------------- */
    });
}
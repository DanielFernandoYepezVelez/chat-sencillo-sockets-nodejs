// Conexion del socket del cliente.
$(function() {
    const socket = io();

    // Obtener los elementos del dom desde la interface
    // a través de su ID.
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    // Obtener los elementos del dom desde el login
    // a través de su ID.
    const $nickError = $('#nickError');
    const $nickForm = $('#nickForm');
    const $nickName = $('#nickName');
    const $users = $('#usernames');

    $nickForm.submit(event => {
        event.preventDefault();

        socket.emit('new user', $nickName.val(), data => {
            if (data) {
                $('#nickWrap').hide();
                $('#container-wrap').show();
            } else {
                $nickError.html(`
                <div class="alert alert-danger">
                    Ese nombre de usuario ya existe
                </div>
                `);
            }
            $nickName.val('');
        });
    });

    // Events
    // Estamos enviando al servidor el dato de ese input(id)
    $messageForm.submit(event => {

        // No recargar la pagina cuando envies la data.
        event.preventDefault();

        // Mandar los datos al servidor a traves de los sockets
        socket.emit('send message', $messageBox.val());

        // Luego de mandar la data el input que en blanco otra vez
        $messageBox.val('');
    });

    // evento o respuesta que viene desde el servidor para cada usuario
    socket.on('new message', data => {
        $chat.append('<b>' + data.nick + ': </b> ' + data.message + '<br/>');
    });

    // respuesta del servidor al usuario
    socket.on('usernames', data => {
        let html = '';

        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i>${data[i]}</p>`;
        }
        $users.html(html);
    });

    socket.on('load old messages', messages => {
        for (let i = 0; i < messages.length; i++) {
            displayMessages(messages[i]);
        }
    });

    function displayMessages(data) {
        $chat.append(`<p class="whisper">${data.nick}: </b>${data.message}</p>`);
    }
});
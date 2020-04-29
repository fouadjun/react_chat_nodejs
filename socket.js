const socket_io = require('socket.io');

const socket = (server) => {
    const io = socket_io(server);

    io.use(function (socket, next) {
        console.log('socket is connected', socket.handshake.query.auth_token);

        next();
    });

    io.on('connection', function(socket) {
        console.log('new connection!', socket.id);

        socket.emit("helloBro", {data: { name: 'Fuad' }});

    });


};

module.exports = socket;

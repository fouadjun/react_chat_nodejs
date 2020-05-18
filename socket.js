const socket_io = require('socket.io');
const Auth = require('./services/auth');

const socket = (server) => {
    const io = socket_io(server);
    let sockets = [];

    io.use(function (socket, next) {
        console.log('socket is connected');

        Auth.checkAuth(socket.handshake.query.auth_token).then(r => {
            sockets[socket.id] = socket;
            next();
        }).catch(() => {
            socket.disconnect();
        });
    });

    io.on('connection', function(socket) {
        console.log('new connection!', socket.id);

        //socket.emit("helloBro", {data: { name: 'Fuad' }});

        socket.on('send', function (socket) {
            console.log(socket);
        })

    });




};

module.exports = socket;

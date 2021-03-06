const socket_io = require('socket.io');
const Auth = require('./services/auth');
const {sendMessage} = require('./services/messaging');

const socket = (server) => {
    const io = socket_io(server);
    let sockets = [];

    io.use(function (socket, next) {
        console.log('socket is connected');

        Auth.checkAuth(socket.handshake.query.auth_token).then(user => {
            //console.log({socket, user});
            sockets[user._id] = {socket, user};
            next();
        }).catch(() => {
            socket.disconnect();
        });
    });

    io.on('connection', function(socket) {
        console.log('new connection!', socket.id);

        socket.on('send', (data) => {
            //console.log(sockets[socket.id]);
            sendMessage(data.from_user, data.to_user, data.message);

            let checkUser = sockets[data.to_user];
            if (checkUser) checkUser.socket.emit('receive', {from_user: data.from_user, message: data.message});
        })

    });




};

module.exports = socket;

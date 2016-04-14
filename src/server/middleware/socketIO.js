import socketIO from 'socket.io';

let listen = function(server) {
    let io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    return io
};


export default {
    listen: listen
};

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listen = server => {
    let io = (0, _socket2.default)(server);

    io.on('connection', socket => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
};

exports.default = {
    listen: listen
};
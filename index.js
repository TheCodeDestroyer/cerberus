'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.io = exports.server = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _socketIO = require('./middleware/socketIO');

var _socketIO2 = _interopRequireDefault(_socketIO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();
let server = exports.server = _http2.default.createServer(app);
let io = exports.io = _socketIO2.default.listen(server);
_mongoose2.default.connect('mongodb://localhost/cerberus');

const argv = _yargs2.default.argv;
const currentEnv = process.env.NODE_ENV = argv.env || process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 8080;

app.use(_express2.default.static(`${ __dirname }/public`));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));

app.use(_controllers2.default);

server.listen(port, () => {
    console.log(`${ currentEnv.toUpperCase() } - Server is listening on port ${ port }`);
});

exports.default = app;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _eventEmitter = require('../middleware/eventEmitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Schema = _mongoose2.default.Schema;
let shellLogSchema = new Schema({
    processId: Number,
    shellName: String,
    timestamp: Number,
    output: String
});

shellLogSchema.post('save', shellLog => {
    _eventEmitter2.default.emit('cerberus:ShellLog:created', shellLog);
});

exports.default = _mongoose2.default.model('ShellLog', shellLogSchema, 'ShellLog');
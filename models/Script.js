'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Schema = _mongoose2.default.Schema;
let scriptSchema = new Schema({
    name: String,
    executableData: String,
    type: Number
});

exports.default = _mongoose2.default.model('Script', scriptSchema, 'Script');
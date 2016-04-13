'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

router.get('/:rawCommand', function (req, res) {
    let command = req.params.rawCommand;
    res.send({ timestamp: new Date().getTime(), output: `Executed ${ command }!` });
    executeShell(command);
});

let executeShell = shellCommand => {
    let childProcess = _shelljs2.default.exec(shellCommand, { async: true });
    childProcess.stdout.on('data', data => {
        _index.io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: data.toString() });
    });
    childProcess.stderr.on('data', data => {
        _index.io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: `ERROR: ${ data.toString() }` });
    });
    childProcess.on('close', code => {
        _index.io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: `Execution stopped -  Code: ${ code }` });
    });
};

exports.default = router;
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
    executeShell(command);
    res.send({ timestamp: new Date().getTime(), output: `Executed ${ command }!` });
});

let executeShell = shellCommand => {
    let childProcess = _shelljs2.default.exec(shellCommand, { async: true });
    childProcess.stdout.on('data', data => {
        _index.io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: data.toString() });
    });
};

exports.default = router;
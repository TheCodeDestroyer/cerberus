'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

router.get('/:rawCommand', function (req, res) {
    let command = req.params.rawCommand;

    executeShell(command);

    res.send({ execResult: `Executed ${ command }!` });
});

let executeShell = shellCommand => {
    let childProcess = _shelljs2.default.exec(shellCommand, { async: true });
    childProcess.stdout.on('data', data => {});
};

exports.default = router;
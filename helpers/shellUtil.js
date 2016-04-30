'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('../index');

var _ShellLog = require('../models/ShellLog');

var _ShellLog2 = _interopRequireDefault(_ShellLog);

var _eventEmitter = require('../middleware/eventEmitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let executeShell = script => {
    let childProcess = _shelljs2.default.exec(`eval ${ script.executableData }`, { async: true });
    _ShellLog2.default.find({ shellName: script.name, processId: { $ne: !childProcess.pid } }, (err, results) => {
        _lodash2.default.forEach(results, shellLog => {
            shellLog.remove();
        });
    });

    insertLog(script.name, childProcess.pid, `Executed ${ script.name }!`);
    childProcess.stdout.on('data', data => {
        insertLog(script.name, childProcess.pid, data.toString());
    });
    childProcess.stderr.on('data', data => {
        insertLog(script.name, childProcess.pid, data.toString());
    });
    childProcess.on('close', code => {
        insertLog(script.name, childProcess.pid, `Execution stopped -  Code: ${ code }`);
    });

    return {
        processId: childProcess.pid,
        shellName: script.name
    };
};

let insertLog = (shellName, processId, output) => {
    let newShellLog = new _ShellLog2.default();
    newShellLog.processId = processId;
    newShellLog.shellName = shellName;
    newShellLog.timestamp = new Date().getTime();
    newShellLog.output = output;

    newShellLog.save();
};

_eventEmitter2.default.on('cerberus:ShellLog:created', newShellLog => {
    _index.io.emit('shellLog', newShellLog);
});

const shellUtil = {
    executeShell: executeShell
};

exports.default = shellUtil;
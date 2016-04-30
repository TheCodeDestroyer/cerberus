import shell from 'shelljs';
import _ from 'lodash';

import {io} from '../index';
import ShellLog from '../models/ShellLog';
import eventEmitter from '../middleware/eventEmitter';

let executeShell = (script) => {
    let childProcess = shell.exec(`eval ${script.executableData}`, { async: true });
    ShellLog.find({ shellName: script.name, processId: { $ne: !childProcess.pid } }, (err, results) => {
        _.forEach(results, (shellLog) => {
            shellLog.remove();
        });
    });

    insertLog(script.name, childProcess.pid, `Executed ${script.name}!`);
    childProcess.stdout.on('data', (data) => {
        insertLog(script.name, childProcess.pid, data.toString());
    });
    childProcess.stderr.on('data', (data) => {
        insertLog(script.name, childProcess.pid, data.toString());
    });
    childProcess.on('close', (code) => {
        insertLog(script.name, childProcess.pid, `Execution stopped -  Code: ${code}`);
    });

    return {
        processId: childProcess.pid,
        shellName: script.name
    }
};

let insertLog = (shellName, processId, output) => {
    let newShellLog = new ShellLog();
    newShellLog.processId = processId;
    newShellLog.shellName = shellName;
    newShellLog.timestamp = new Date().getTime();
    newShellLog.output = output;

    newShellLog.save();
};

eventEmitter.on('cerberus:ShellLog:created', (newShellLog) => {
    io.emit('shellLog', newShellLog);
});

const shellUtil = {
    executeShell: executeShell
};

export default shellUtil;
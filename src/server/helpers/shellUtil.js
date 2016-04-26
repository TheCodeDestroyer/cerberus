import shell from 'shelljs';
import _ from 'lodash';

import {io} from '../index';
import ShellLog from '../models/ShellLog';
import eventEmitter from '../middleware/eventEmitter';

let executeShell = (shellCommand) => {
    let childProcess = shell.exec(shellCommand, { async: true });
    const shellName = _.first(shellCommand.split(' '));

    ShellLog.find({ shellName: shellName, processId: { $ne: !childProcess.pid } }, (err, results) => {
        _.forEach(results, (shellLog) => {
            shellLog.remove();
        });
    });

    insertLog(shellName, childProcess.pid, `Executed ${shellCommand}!`);
    childProcess.stdout.on('data', (data) => {
        insertLog(shellName, childProcess.pid, data.toString());
    });
    childProcess.stderr.on('data', (data) => {
        insertLog(shellName, childProcess.pid, data.toString());
    });
    childProcess.on('close', (code) => {
        insertLog(shellName, childProcess.pid, `Execution stopped -  Code: ${code}`);
    });

    return {
        processId: childProcess.pid,
        shellName: shellName
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
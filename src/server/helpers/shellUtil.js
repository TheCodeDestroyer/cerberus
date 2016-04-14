import shell from 'shelljs';
import {io} from '../index';

let executeShell = (shellCommand) => {
    let childProcess = shell.exec(shellCommand, { async: true });
    var processIO = io.of(`/${childProcess.pid}`);

    processIO.emit('shellLog', { timestamp: new Date().getTime(), output: `Executed ${shellCommand}!` });
    childProcess.stdout.on('data', (data) => {
        processIO.emit('shellLog', { timestamp: new Date().getTime(), output: data.toString() });
    });
    childProcess.stderr.on('data', (data) => {
        processIO.emit('shellLog', { timestamp: new Date().getTime(), output: `ERROR: ${data.toString()}` });
    });
    childProcess.on('close', (code) => {
        processIO.emit('shellLog', { timestamp: new Date().getTime(), output: `Execution stopped -  Code: ${code}` });
    });
    
    return childProcess.pid
};

let shellUtil = {
    executeShell: executeShell
};

export default shellUtil;
import shell from 'shelljs';
import {io} from '../index';

let executeShell = (shellCommand) => {
    let childProcess = shell.exec(shellCommand, { async: true });

    io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: `Executed ${shellCommand}!` });
    childProcess.stdout.on('data', (data) => {
        io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: data.toString() });
    });
    childProcess.stderr.on('data', (data) => {
        io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: `ERROR: ${data.toString()}` });
    });
    childProcess.on('close', (code) => {
        io.sockets.emit('shellLog', { timestamp: new Date().getTime(), output: `Execution stopped -  Code: ${code}` });
    });
};

let shellUtil = {
    executeShell: executeShell
};

export default shellUtil;
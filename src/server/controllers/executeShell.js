import express from 'express';
import shell from 'shelljs';
import {io} from '../index';

let router = express.Router();

router.get('/:rawCommand', function(req, res) {
    let command = req.params.rawCommand;
    executeShell(command);
    res.send({ timestamp: new Date().getTime(), output: `Executed ${command}!` });
});

let executeShell = shellCommand => {
    let childProcess = shell.exec(shellCommand, { async: true });
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

export default router;

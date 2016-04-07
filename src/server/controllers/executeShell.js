import express from 'express';
import shell from 'shelljs';

let router = express.Router();

router.get('/:rawCommand', function(req, res) {
    let command = req.params.rawCommand;

    executeShell(command);

    res.send({ execResult: `Executed ${command}!` });
});

let executeShell = shellCommand => {
    let childProcess = shell.exec(shellCommand, { async: true });
    childProcess.stdout.on('data', (data) => {
        //TODO: Push to client
    });
};

export default router;

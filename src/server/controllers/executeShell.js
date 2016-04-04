import express from 'express';
import shell from 'shelljs';

let router = express.Router();

router.get('/:rawCommand', function(req, res) {
    let command = req.params.rawCommand;

    executeShell(command);

    res.send({ execResult: `Executed ${command}!` });
});

let executeShell = shellCommand => {
    shell.exec(shellCommand, { async: true })
};

export default router;

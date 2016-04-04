import express from 'express';
import shell from 'shelljs';

let router = express.Router();

router.get('/:id', function(req, res) {
    let command = req.params.id;

    executeShell(command);

    res.send({ execResult: `Executed ${command}!` });
});

let executeShell = shellCommand => {
    shell.exec(shellCommand, { async: true })
};

export default router;

import express from 'express';
import shellUtil from '../helpers/shellUtil';

let router = new express.Router();

router.get('/:rawCommand', (req, res) => {
    const command = req.params.rawCommand;
    let processInfo = shellUtil.executeShell(command);
    res.send({ success: true, processId: processInfo.processId, shellName: processInfo.shellName });
});

export default router;

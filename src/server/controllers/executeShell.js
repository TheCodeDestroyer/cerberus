import express from 'express';
import shellUtil from '../helpers/shellUtil';

let router = new express.Router();

router.get('/:rawCommand', function(req, res) {
    const command = req.params.rawCommand;
    const processId = shellUtil.executeShell(command);
    res.send({ success: true, processId: processId });
});

export default router;

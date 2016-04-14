import express from 'express';
import shellUtil from '../helpers/shellUtil';

let router = new express.Router();

router.get('/:rawCommand', function(req, res) {
    let command = req.params.rawCommand;
    shellUtil.executeShell(command);
    res.send({ success: true });
});



export default router;

import express from 'express';
import shellUtil from '../helpers/shellUtil';
import Script from '../models/script';
import {authenticateJwt} from './auth';

let router = new express.Router();

router.get('/:scriptId', authenticateJwt, (req, res) => {
    const scriptId = req.params.scriptId;

    Script.findOne({ _id: scriptId }, (err, script) => {
        let processInfo = shellUtil.executeShell(script);
        res.send({ success: true, processId: processInfo.processId, shellName: processInfo.shellName });
    });
});

export default router;

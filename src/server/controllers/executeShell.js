import express from 'express';
import shellUtil from '../helpers/shellUtil';
import Script from '../models/Script';

let router = new express.Router();

router.get('/:scriptName', (req, res) => {
    const scriptName = req.params.scriptName;

    Script.findOne({ name: scriptName }, (err, script) => {
        let processInfo = shellUtil.executeShell(script);
        res.send({ success: true, processId: processInfo.processId, shellName: processInfo.shellName });
    });
});

export default router;

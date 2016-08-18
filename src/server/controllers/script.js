import express from 'express';

import Script from '../models/script';
import {authenticateJwt} from './auth';

let router = new express.Router();

router.get('/', authenticateJwt, (req, res) => {
    Script.find((err, scripts) => {
        res.send({ success: true, data: scripts });
    });
});

router.get('/:scriptId', authenticateJwt, (req, res) => {
    const scriptId = req.params.scriptId;

    Script.findOne({ _id: scriptId }, (err, script) => {
        res.send({ success: true, data: script });
    });
});

router.post('/', authenticateJwt, (req, res) => {
    let rawScriptData = req.body;
    let newScript = new Script();

    newScript.name = rawScriptData.name;
    newScript.executableData = rawScriptData.executableData;
    newScript.type = rawScriptData.type;

    newScript.save((err, script) => {
        if (err) {
            res.send({ success: false, data: err });
        }
        res.send({ success: true, data: script });
    });
});

router.put('/:scriptId', authenticateJwt, (req, res) => {
    const scriptId = req.params.scriptId;
    let rawScriptData = req.body;
    let updateObject = {
        name: rawScriptData.name,
        executableData: rawScriptData.executableData,
        type: rawScriptData.type
    };

    Script.update({ _id: scriptId }, updateObject,
        (err, raw) => {
            if (err) {
                res.send({ success: false, data: err });
            }
            else {
                res.send({ success: true, data: raw });
            }
        }
    );
});

export default router;

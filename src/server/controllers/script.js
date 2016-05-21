import express from 'express';

import Script from '../models/script';
import {isAuthenticated} from './auth';

let router = new express.Router();

router.get('/', isAuthenticated,  (req, res) => {
    Script.find((err, scripts) => {
        res.send({ success: true, data: scripts });
    });
});

router.get('/:scriptId', isAuthenticated, (req, res) => {
    const scriptId = req.params.scriptId;
    
    Script.findOne({ _id: scriptId }, (err, script) => {
        res.send({ success: true, data: script });
    });
});

router.post('/', isAuthenticated, (req, res) => {
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

router.put('/:scriptId', isAuthenticated, (req, res) => {
    const scriptId = req.params.scriptId;
    let rawScriptData = req.body;

    Script.update({ _id: scriptId }, {
            name: rawScriptData.name,
            executableData: rawScriptData.executableData,
            type: rawScriptData.type
        },
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

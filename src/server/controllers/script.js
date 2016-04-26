import express from 'express';

import Script from '../models/Script';

let router = new express.Router();

router.get('/', (req, res) => {
    Script.find({}, (err, scripts) => {
        res.send({ success: true, data: scripts });
    });
});

router.get('/:scriptName', (req, res) => {
    const scriptName = req.params.scriptName;
    
    Script.find({ name: scriptName }, (err, script) => {
        res.send({ success: true, data: script });
    });
});

router.post('/', (req, res) => {
    let rawScriptData = req.body;
    let newScript = new Script();

    newScript.name = rawScriptData.name;
    newScript.executableData = rawScriptData.executableData;
    newScript.type = rawScriptData.type;

    newScript.save();

    res.send({ success: true, data: newScript });
});

router.put('/:scriptName', (req, res) => {
    const scriptName = req.params.scriptName;
    let rawScriptData = req.body;

    Script.update({ name: scriptName }, {
            name: rawScriptData.name,
            executableData: rawScriptData.executableData,
            type: rawScriptData.type
        },
        function(err, raw) {
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
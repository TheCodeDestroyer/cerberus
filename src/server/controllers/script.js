import express from 'express';

import Script from '../models/script';

let router = new express.Router();

router.get('/', (req, res) => {
    Script.find({}, (err, scripts) => {
        res.send({ success: true, data: scripts });
    });
});

router.get('/:scriptId', (req, res) => {
    const scriptId = req.params.scriptId;
    
    Script.findOne({ _id: scriptId }, (err, script) => {
        res.send({ success: true, data: script });
    });
});

router.post('/', (req, res) => {
    let rawScriptData = req.body;
    let newScript = new Script();

    newScript.name = rawScriptData.name;
    newScript.executableData = rawScriptData.executableData;
    newScript.type = rawScriptData.type;

    newScript.save((err, user) => {
        if (err) {
            res.send({ success: false, data: err });
        }
        res.send({ success: true, data: user });
    });

});

router.put('/:scriptId', (req, res) => {
    const scriptId = req.params.scriptId;
    let rawScriptData = req.body;

    Script.update({ _id: scriptId }, {
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
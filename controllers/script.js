'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Script = require('../models/Script');

var _Script2 = _interopRequireDefault(_Script);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = new _express2.default.Router();

router.get('/', (req, res) => {
    _Script2.default.find({}, (err, scripts) => {
        res.send({ success: true, data: scripts });
    });
});

router.get('/:scriptId', (req, res) => {
    const scriptId = req.params.scriptId;

    _Script2.default.findOne({ _id: scriptId }, (err, script) => {
        res.send({ success: true, data: script });
    });
});

router.post('/', (req, res) => {
    let rawScriptData = req.body;
    let newScript = new _Script2.default();

    newScript.name = rawScriptData.name;
    newScript.executableData = rawScriptData.executableData;
    newScript.type = rawScriptData.type;

    newScript.save();

    res.send({ success: true, data: newScript });
});

router.put('/:scriptId', (req, res) => {
    const scriptId = req.params.scriptId;
    let rawScriptData = req.body;

    _Script2.default.update({ _id: scriptId }, {
        name: rawScriptData.name,
        executableData: rawScriptData.executableData,
        type: rawScriptData.type
    }, function (err, raw) {
        if (err) {
            res.send({ success: false, data: err });
        } else {
            res.send({ success: true, data: raw });
        }
    });
});

exports.default = router;
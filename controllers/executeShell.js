'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _shellUtil = require('../helpers/shellUtil');

var _shellUtil2 = _interopRequireDefault(_shellUtil);

var _Script = require('../models/Script');

var _Script2 = _interopRequireDefault(_Script);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = new _express2.default.Router();

router.get('/:scriptId', (req, res) => {
    const scriptId = req.params.scriptId;

    _Script2.default.findOne({ _id: scriptId }, (err, script) => {
        let processInfo = _shellUtil2.default.executeShell(script);
        res.send({ success: true, processId: processInfo.processId, shellName: processInfo.shellName });
    });
});

exports.default = router;
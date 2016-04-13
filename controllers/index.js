'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _executeShell = require('./executeShell');

var _executeShell2 = _interopRequireDefault(_executeShell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

router.use('/executeShell', _executeShell2.default);

exports.default = router;
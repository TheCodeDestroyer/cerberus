'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = new _express2.default.Router();
let redirect = {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'
};
router.post('/', _passport2.default.authenticate('local', redirect), (req, res) => {});

exports.default = router;
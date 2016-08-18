import express from 'express';

import User from '../models/user';
import {authenticateJwt} from './auth';

let router = new express.Router();

router.get('/', authenticateJwt, (req, res) => {
    User.find((err, users) => {
        res.send({ success: true, data: users });
    });
});

router.get('/:userId', authenticateJwt, (req, res) => {
    const userId = req.params.userId;

    User.findOne({ _id: userId }, (err, user) => {
        res.send({ success: true, data: user });
    });
});

router.post('/', authenticateJwt, (req, res) => {
    let rawUserData = req.body;
    let newUser = new User();

    newUser.username = rawUserData.username;
    newUser.password = rawUserData.password;

    newUser.save((err, user) => {
        if (err) {
            res.send({ success: false, data: err });
        }
        res.send({ success: true, data: user });
    });
});

router.put('/:userId', authenticateJwt, (req, res) => {
    const userId = req.params.userId;
    let rawUserData = req.body;
    let updateObject = {
        username: rawUserData.username,
        password: rawUserData.password
    };

    User.update({ _id: userId }, updateObject,
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

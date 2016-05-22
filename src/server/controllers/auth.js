import express from 'express';
import passport from 'passport';
import Strategy from 'passport-local';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import User from '../models/user';

let router = new express.Router();

console.log(expressJwt);

const serverSecret = '//TODO: store server secret properly';
export const authenticateJwt = expressJwt({ secret: serverSecret });
export const authenticateLocal = passport.authenticate(['local'], { session: false });

const db = {
    updateOrCreate: (user, cb) => {
        cb(null, user);
    }
};

passport.use(new Strategy((username, password, cb) => {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }

            user.verifyPassword(password, (err, isMatch) => {
                if (err) {
                    return cb(err);
                }
                if (!isMatch) {
                    return cb(null, false);
                }

                return cb(null, user);
            });
        });
    }
));

let serialize = (req, res, cb) => {
    db.updateOrCreate(req.user, function(err, user) {
        if (err) {
            return next(err);
        }
        req.user = {
            id: user.id,
            username: user.username
        };
        cb();
    });
};

let generateToken = (req, res, cb) => {
    req.token = jwt.sign({
            id: req.user.id
        },
        serverSecret, {
            expiresIn: '8h'
        });
    cb();
};

let respond = (req, res) => {
    res.status(200).json({
        user: req.user,
        token: req.token
    });
};

router.post('', authenticateLocal, serialize, generateToken, respond);

export default router;
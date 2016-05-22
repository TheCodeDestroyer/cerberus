import express from 'express';
import passport from 'passport';

import User from '../models/user';

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

export let isAuthenticated = passport.authenticate([''], { session: false });

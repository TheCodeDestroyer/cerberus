import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';

import User from '../models/user';
import ApplicationClient from '../models/applicationClient';
import Token from '../models/token';

passport.use(new BasicStrategy((username, password, cb) => {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return cb(err); }

            if (!user) { return cb(null, false); }

            user.verifyPassword(password, (err, isMatch) => {
                if (err) { return cb(err); }

                if (!isMatch) { return cb(null, false); }

                return cb(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy((username, password, callback) => {
        ApplicationClient.findOne({ id: username }, (err, client) => {
            if (err) { return callback(err); }

            if (!client || client.secret !== password) { return callback(null, false); }

            return callback(null, client);
        });
    }
));

passport.use(new BearerStrategy((accessToken, callback) => {
        Token.findOne({value: accessToken }, (err, token) => {
            if (err) { return callback(err); }

            if (!token) { return callback(null, false); }

            User.findOne({ _id: token.userId }, (err, user) => {
                if (err) { return callback(err); }

                if (!user) { return callback(null, false); }

                callback(null, user, { scope: '*' });
            });
        });
    }
));

export let isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });

export let isClientAuthenticated = passport.authenticate('client-basic', { session: false });

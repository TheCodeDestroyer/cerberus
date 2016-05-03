import passport from 'passport';
import {BasicStrategy} from 'passport-http';

import User from '../models/user';

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

let isAuthenticated = passport.authenticate('basic', { session: false });

export default isAuthenticated;

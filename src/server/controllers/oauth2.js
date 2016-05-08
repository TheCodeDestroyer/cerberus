import oauth2orize from 'oauth2orize';
import express from 'express';

import {isAuthenticated, isClientAuthenticated} from './auth';
import ApplicationClient from '../models/applicationClient';
import Token from '../models/token';
import AuthCode from '../models/authCode';

import {uid} from '../helpers/util';

let router = new express.Router();
let server = oauth2orize.createServer();

server.serializeClient((client, callback) => {
    return callback(null, client._id);
});

server.deserializeClient((id, callback) => {
    ApplicationClient.findOne({ _id: id }, (err, client) => {
        if (err) { return callback(err); }
        return callback(null, client);
    });
});

server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, callback) => {
    let newAuthCode = new AuthCode({
        value: uid(16),
        clientId: client._id,
        redirectUri: redirectUri,
        userId: user._id
    });

    newAuthCode.save((err) => {
        if (err) { return callback(err); }

        callback(null, newAuthCode.value);
    });
}));

server.exchange(oauth2orize.exchange.code((client, code, redirectUri, callback) => {
    AuthCode.findOne({ value: code }, (err, authCode) => {
        if (err) { return callback(err); }
        if (authCode === undefined) { return callback(null, false); }
        if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
        if (redirectUri !== authCode.redirectUri) { return callback(null, false); }

        authCode.remove((err) => {
            if(err) { return callback(err); }

            let newToken = new Token({
                value: uid(256),
                clientId: authCode.clientId,
                userId: authCode.userId
            });

            newToken.save((err) => {
                if (err) { return callback(err); }

                callback(null, newToken);
            });
        });
    });
}));

let authorization = [
    server.authorization((clientId, redirectUri, callback) => {

        ApplicationClient.findOne({ clientId: clientId }, (err, client) => {
            if (err) {
                return callback(err);
            }

            return callback(null, client, redirectUri);
        });
    }),
    (req, res) => {
        res.send({ transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
];

let decision = [
    server.decision()
];

let token = [
    server.token(),
    server.errorHandler()
];

//TODO: Not sure if this is what I want yet...
router.get('/authorize', isAuthenticated, authorization);
router.post('/authorize', isAuthenticated, decision);
router.post('/token', isClientAuthenticated, token);

export default router;
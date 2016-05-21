import express from 'express';

import ApplicationClient from '../models/applicationClient';
import {isAuthenticated} from './auth';

let router = new express.Router();

router.get('/', isAuthenticated, (req, res) => {
    ApplicationClient.find((err, applicationClients) => {
        res.send({ success: true, data: applicationClients });
    });
});

router.get('/:applicationClientId', isAuthenticated, (req, res) => {
    const applicationClientId = req.params.applicationClientId;

    ApplicationClient.findOne({ _id: applicationClientId }, (err, applicationClient) => {
        res.send({ success: true, data: applicationClient });
    });
});

//TODO: Uncomment after testing
router.post('/', isAuthenticated, (req, res) => {
    let rawApplicationClientData = req.body;
    let newApplicationClient = new ApplicationClient();

    newApplicationClient.name = rawApplicationClientData.name;
    newApplicationClient.clientId = rawApplicationClientData.clientId;
    newApplicationClient.secret = rawApplicationClientData.secret;
    newApplicationClient.userId = rawApplicationClientData.userId;

    newApplicationClient.save((err, user) => {
        if (err) {
            res.send({ success: false, data: err });
        }
        res.send({ success: true, data: user });
    });
});

router.put('/:applicationClientId', isAuthenticated, (req, res) => {
    const applicationClientId = req.params.applicationClientId;
    let rawUserData = req.body;

    ApplicationClient.update({ _id: applicationClientId }, {
            name: rawUserData.name,
            clientId: rawUserData.clientId,
            secret: rawUserData.secret,
            userId: rawUserData.userId
        },
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

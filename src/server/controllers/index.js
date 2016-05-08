import express from 'express';

import executeShell from './executeShell';
import script from './script';
import user from './user';
import applicationClient from './applicationClient';
import oauth2 from './oauth2';

let router = new express.Router();
const apiRoot = '/api';

router.use(`${apiRoot}/executeShell`, executeShell);
router.use(`${apiRoot}/script`, script);
router.use(`${apiRoot}/user`, user);
router.use(`${apiRoot}/applicationClient`, applicationClient);
router.use(`${apiRoot}/oauth2`, oauth2);

export default router;

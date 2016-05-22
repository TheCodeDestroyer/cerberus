import express from 'express';

import executeShell from './executeShell';
import script from './script';
import user from './user';
import auth from './auth';

let router = new express.Router();
const apiRoot = '/api';

router.use(`${apiRoot}/executeShell`, executeShell);
router.use(`${apiRoot}/script`, script);
router.use(`${apiRoot}/user`, user);
router.use(`${apiRoot}/auth`, auth);

export default router;

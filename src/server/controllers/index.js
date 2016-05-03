import express from 'express';

import executeShell from './executeShell';
import script from './script';
import user from './user';

let router = new express.Router();
const apiRoot = '/api';

router.use(`${apiRoot}/executeShell`, executeShell);
router.use(`${apiRoot}/script`, script);
router.use(`${apiRoot}/user`, user);

export default router;

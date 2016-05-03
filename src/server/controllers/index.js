import express from 'express';

import executeShell from './executeShell';
import script from './script';

let router = new express.Router();
const apiRoot = '/api';

router.use(`${apiRoot}/executeShell`, executeShell);
router.use(`${apiRoot}/script`, script);

export default router;

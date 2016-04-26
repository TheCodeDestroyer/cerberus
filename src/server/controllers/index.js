import express from 'express';

import executeShell from './executeShell';
import script from './script';

let router = new express.Router();

router.use('/executeShell', executeShell);
router.use('/script', script);

export default router;

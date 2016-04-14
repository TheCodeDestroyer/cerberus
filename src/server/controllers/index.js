import express from 'express';

import executeShell from './executeShell';

let router = new express.Router();

router.use('/executeShell', executeShell);

export default router;

import express from 'express';

import executeShell from './executeShell';

let router = express.Router();

router.use('/executeShell', executeShell);

export default router;

import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/test', require('./test'));
router.use('/auth', require('./auth/index'));

module.exports = router;
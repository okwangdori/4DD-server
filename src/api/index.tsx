import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/test', require('./test'));

module.exports = router;
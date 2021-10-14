const { Router } = require('express');
const { sync } = require('../controllers/syncController');

const router = Router();

router.post('/sync', sync);

module.exports = router;

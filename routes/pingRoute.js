const { Router } = require('express');
const { ping } = require('../controllers/pingController');

const router = Router();

router.get('/', ping);

module.exports = router;

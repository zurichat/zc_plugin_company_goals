const { Router } = require('express');
const { test } = require('../controllers/centrifugoController');

const router = Router();

router.route('/').get(test);

module.exports = router;
const { Router } = require('express');
const centrifugo = require('../controllers/centrifugoController');

const router = Router();


router.route('/').get(centrifugo);

module.exports = router;

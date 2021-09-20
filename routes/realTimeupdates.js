const { Router } = require('express');
const {getUpdates } = require('../controllers/realtimeController');

const router = Router();

router.route('/').get(getUpdates);

module.exports = router;
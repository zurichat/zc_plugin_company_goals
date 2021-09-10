const { Router } = require('express');
const getPluginInfo = require('../controllers/infoController');

const router = Router();

router.route('/').get(getPluginInfo);

module.exports = router;

const { Router } = require('express');
const { installPlugin, uninstallPlugin } = require('../controllers/PluginController');

const router = Router();

router.post('/install', installPlugin);
router.delete('/uninstall', uninstallPlugin);

module.exports = router;

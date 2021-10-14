const { Router } = require('express');
const { installPlugin, uninstallPlugin } = require('../controllers/PluginController');

const router = Router();

router.post('/', installPlugin);
router.delete('/', uninstallPlugin);

module.exports = router;

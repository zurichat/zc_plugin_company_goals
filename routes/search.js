const router = require('express').Router();
const { searchPlugin } = require('../controllers/searchPluginController');

// Search plugin
router.route('/search-plugin').get(searchPlugin);

module.exports = router;

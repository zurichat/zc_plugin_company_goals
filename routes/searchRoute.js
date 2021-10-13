const router = require('express').Router();
const { searchPlugin } = require('../controllers/searchPluginController');

// Search plugin
router.route('/:org_id/members/:member_id/search').get(searchPlugin);

module.exports = router;

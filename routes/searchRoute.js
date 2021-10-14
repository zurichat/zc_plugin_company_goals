const router = require('express').Router();
const { searchFunction } = require('../controllers/searchController');

// Search plugin
router.route('/:org_id/:member_id/').get(searchFunction);

module.exports = router;

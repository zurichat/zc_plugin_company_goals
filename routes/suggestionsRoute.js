const router = require('express').Router();
const { searchSuggestions } = require('../controllers/suggestionController');

// Search plugin
router.route('/:org_id/:member_id/').get(searchSuggestions);

module.exports = router;

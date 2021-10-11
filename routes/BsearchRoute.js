const { Router } = require('express');
const { searchGoals } = require('../controllers/BsearchController');

const router = Router();

router.route('/').get(searchGoals);

module.exports = router;

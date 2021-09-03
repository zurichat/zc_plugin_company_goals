const { Router } = require('express');

const { createGoals } = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoals);

module.exports = router;

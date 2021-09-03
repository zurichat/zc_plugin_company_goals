const { Router } = require('express');

const { getAllGoals, createGoals } = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoals).get(getAllGoals);

module.exports = router;

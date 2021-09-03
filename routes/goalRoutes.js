const { Router } = require('express');

const goalController = require('../controllers/goalController');

const router = Router();

router.route('/').get(goalController.getAllGoals);

router.route('/:id').get(goalController.getSingleGoal);

module.exports = router;

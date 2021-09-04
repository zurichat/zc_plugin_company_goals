const { Router } = require('express');

const goalController = require('../controllers/goalController');

const router = Router();

router.route('/').post(goalController.createGoals).get(goalController.getAllGoals);

router.route('/:id').get(goalController.getSingleGoal).patch(goalController.updateSingleGoalById);

module.exports = router;

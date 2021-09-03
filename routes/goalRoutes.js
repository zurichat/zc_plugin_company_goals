const { Router } = require('express');

const goalController = require('../controllers/goalController');

const router = Router();

router.route('/').get(goalController.getAllGoals).post(goalController.createGoal);
router.route('/:id').patch(goalController.updateSingleGoalById);



module.exports = router;

const { Router } = require('express');

const { getSingleGoal, getAllGoals, updateSingleGoalById, createGoals } = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoals).get(getAllGoals);

router.route('/:id').get(getSingleGoal);

router.put('/update/:id', updateSingleGoalById);

module.exports = router;

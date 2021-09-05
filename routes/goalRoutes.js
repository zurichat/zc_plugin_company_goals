const { Router } = require('express');

const { getSingleGoal, getAllGoals, updateGoalByID, createGoals } = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoals).get(getAllGoals);

router.route('/:id').get(getSingleGoal);

// router.patch('/update/:id', updateGoalByID);

module.exports = router;

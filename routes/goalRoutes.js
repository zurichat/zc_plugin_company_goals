const { Router } = require('express');

const { createGoal, getSingleGoal,getAllGoals, updateGoalByID } = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoal).get(getAllGoals);

router.route('/:id').get(getSingleGoal)
router.patch('/update/:id', updateGoalByID);

module.exports = router;

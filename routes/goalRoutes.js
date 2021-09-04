const { Router } = require('express');

const { createGoals, getSingleGoal,getAllGoals, updateGoalByID } = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoals).get(getAllGoals);

router.route('/:id').get(getSingleGoal)
router.patch('/update/:id', updateGoalByID);

module.exports = router;

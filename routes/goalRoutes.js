const { Router } = require('express');

const { createGoals, getSingleGoal, getAllGoals, updateSingleGoalById } = require('../controllers/goalController');

const router = Router();


router.route('/').post(createGoals).get(getAllGoals);



router.route('/:id').get(getSingleGoal).patch(updateSingleGoalById);


module.exports = router;

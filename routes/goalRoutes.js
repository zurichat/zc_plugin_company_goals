/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { getSingleGoal, getAllGoals, createGoal, updateSingleGoalById, getArchivedGoals, deleteGoal } = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoal).get(getAllGoals);

router.route('/archived').get(getArchivedGoals)

router.route('/find').get(getSingleGoal).delete(deleteGoal)

router.route('/:id').get(getSingleGoal);


router.patch('/update/:id', updateGoalByID);


module.exports = router;

/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { getSingleGoal, getAllGoals, createGoals, updateGoalByID, getArchivedGoals, deleteGoal } = require('../controllers/goalController');

const router = Router();


router.route('/').post(createGoals)
// router.route('/').get(getAllGoals);

router.route('/archived').get(getArchivedGoals)

router.route('/:id').get(getSingleGoal).delete(deleteGoal)

router.route('/:id').get(getSingleGoal);


router.patch('/update/:id', updateGoalByID);


module.exports = router;

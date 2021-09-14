/* eslint-disable no-unused-vars */
const { Router } = require('express');
const {
  getSingleGoal,
  getAllGoals,
  createGoal,
  updateSingleGoalById,
  getArchivedGoals,
  deleteGoal,
} = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoal).get(getAllGoals);

// router.route('/archived').get(getArchivedGoals)

// router.route('/:id').get(getSingleGoal).delete(deleteGoal)

router.route('/:id').get(getSingleGoal);

router.route('/find').get(getSingleGoal).delete(deleteGoal);


// router.patch('/update/:id', updateSingleGoalById);

router.put('/update/:id', updateSingleGoalById);

module.exports = router;

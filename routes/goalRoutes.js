/* eslint-disable no-unused-vars */
const { Router } = require('express');
const {
  getSingleGoal,
  getAllGoals,
  createGoal,
  updateSingleGoalById,
  getArchivedGoals,
  deleteGoal,
  getReports,
} = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoal).get(getAllGoals);

// router.route('/archived').get(getArchivedGoals)

router.route('/report').get(getReports);

// router.route('/:id').get(getSingleGoal).delete(deleteGoal)

router.route('/:id').get(getSingleGoal);

router.route('/find').get(getSingleGoal).delete(deleteGoal);

// router.put('/update/:id', updateSingleGoalById);

module.exports = router;

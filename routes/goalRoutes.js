/* eslint-disable no-unused-vars */
const { Router } = require('express');
const {
  getSingleGoal,
  getAllGoals,
  createGoal,
  assignGoal,
  updateSingleGoalById,
  getArchivedGoals,
  deleteGoalById,
} = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoal).get(getAllGoals);

// router.route('/archived').get(getArchivedGoals)

router.route('/assign').post(assignGoal)


<<<<<<< HEAD
router.route('/find').get(getSingleGoal).delete(deleteGoalById);
=======
router.route('/single').get(getSingleGoal);
router.route('/delete').delete(deleteGoalById);
>>>>>>> e6d0b1ec0631568cb47287f11ca69f8c5ef10fd2


// router.patch('/update/:id', updateSingleGoalById);

router.put('/update/:id', updateSingleGoalById);

module.exports = router;

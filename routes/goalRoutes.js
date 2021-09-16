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
  likeGoal,
  getGoalLikes,
  checkUserLike,
} = require('../controllers/goalController');

const router = Router();

router.route('/').post(createGoal).get(getAllGoals);

// router.route('/archived').get(getArchivedGoals)


// router.route('/:id').get(getSingleGoal).delete(deleteGoal)
router.get('/like', likeGoal);
router.get('/goallikes', getGoalLikes);
router.get('/userlike', checkUserLike);

router.route('/assign').post(assignGoal)
router.route('/single').get(getSingleGoal);
router.route('/delete').delete(deleteGoalById);

// router.patch('/update/:id', updateSingleGoalById);

router.put('/update/:id', updateSingleGoalById);

module.exports = router;

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
  removeAssigned,
  disLikeGoal,
  getGoalDisLikes,
  checkUserDisLikes,
  sortGoalByType,
  createGoalTargets,
  getGoalTargets,
  averageGoalProgress,
  individualGoalProgress,
  deleteTarget
} = require('../controllers/goalController');

const {getChartInfo} = require('../controllers/chartController')

const router = Router();


router.post('/', createGoal)
router.post('/assign', assignGoal)
router.get('/', getAllGoals);
router.get('/chart', getChartInfo);
router.get('/like', likeGoal);
router.get('/goallikes', getGoalLikes);
router.get('/userlike', checkUserLike);
router.get('/single', getSingleGoal);
router.delete('/assigned', removeAssigned);
router.get('/dislike', disLikeGoal);
router.get('/goaldislikes', getGoalDisLikes);
router.get('/userdislike', checkUserDisLikes);
router.get('/catalog', sortGoalByType);
router.post('/target', createGoalTargets)
router.get('/target', getGoalTargets);
router.delete('/target/delete', deleteTarget);
router.get('/average-goal-progress', averageGoalProgress);
router.get('/individual-goal-progress', individualGoalProgress);

router.route('/delete').delete(deleteGoalById);

router.put('/update/:id', updateSingleGoalById);

module.exports = router;
// router.route('/archived').get(getArchivedGoals)
// router.route('/:id').get(getSingleGoal).delete(deleteGoal)
// router.patch('/update/:id', updateSingleGoalById);

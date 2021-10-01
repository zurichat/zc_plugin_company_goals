/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { getChartInfo } = require('../controllers/chartController');
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
<<<<<<< HEAD
  sortGoalByType,
} = require('../controllers/goalController');
const {
=======
  sortGoalByType
} = require('../controllers/goalController');
const { 
>>>>>>> a2ddfd9e90f8792334f1e7fc5fb65f9ab28ec2c6
  updateSingleGoalTargetById,
  createGoalTargets,
  getGoalTargets,
  averageGoalProgress,
  deleteTarget,
<<<<<<< HEAD
  getSingleGoalProgress,
=======
  getGoalProgress
>>>>>>> a2ddfd9e90f8792334f1e7fc5fb65f9ab28ec2c6
} = require('../controllers/targetController');
const auth = require('../middlewares/auth');
const restrictToOwner = require('../middlewares/restrict');

const router = Router();

// auth specific routes
router.post('/', auth, restrictToOwner, createGoal);
router.put('/update/:id', auth, restrictToOwner, updateSingleGoalById);
router.delete('/delete', auth, restrictToOwner, deleteGoalById);

router.post('/assign', assignGoal);
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
router.post('/target', createGoalTargets);
router.get('/target', getGoalTargets);
router.delete('/target/delete', deleteTarget);
router.get('/average-goal-progress', averageGoalProgress);
router.get('/single-goal-progress', getSingleGoalProgress);
router.put('/target/update/:id', updateSingleGoalTargetById);

module.exports = router;

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
  getGoalTargets
} = require('../controllers/goalController');
const auth = require('../middlewares/auth');

const {getChartInfo} = require('../controllers/chartController')

const router = Router();


// auth specific routes
router.post('/', auth, createGoal);
router.route('/delete', auth, deleteGoalById);
router.put('/update/:id', auth, updateSingleGoalById);


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



module.exports = router;
// router.route('/archived').get(getArchivedGoals)
// router.route('/:id').get(getSingleGoal).delete(deleteGoal)
// router.patch('/update/:id', updateSingleGoalById);

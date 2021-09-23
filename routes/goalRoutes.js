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
  checkUserDisLikes
} = require('../controllers/goalController');

const router = Router();


router.post('/', createGoal)
router.post('/assign', assignGoal)
router.get('/', getAllGoals);
router.get('/like', likeGoal);
router.get('/goallikes', getGoalLikes);
router.get('/userlike', checkUserLike);
router.get('/single', getSingleGoal);
router.delete('/assigned', removeAssigned);
router.get('/dislike', disLikeGoal);
router.get('/goaldislikes', getGoalDisLikes);
router.get('/userdislike', checkUserDisLikes);

router.route('/delete').delete(deleteGoalById);

router.put('/update/:id', updateSingleGoalById);

module.exports = router;
// router.route('/archived').get(getArchivedGoals)
// router.route('/:id').get(getSingleGoal).delete(deleteGoal)
// router.patch('/update/:id', updateSingleGoalById);

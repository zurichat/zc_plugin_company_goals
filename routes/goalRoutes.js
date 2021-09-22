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
} = require('../controllers/goalController');

const router = Router();

<<<<<<< HEAD

router.post('/', createGoal)
router.post('/assign', assignGoal)
=======
router.post('/', createGoal);
router.post('/assign', assignGoal);
>>>>>>> c3ee483396871a855240f3f2d6d60585554935ed
router.get('/', getAllGoals);
router.get('/like', likeGoal);
router.get('/goallikes', getGoalLikes);
router.get('/userlike', checkUserLike);
router.get('/single', getSingleGoal);
router.delete('/assigned', removeAssigned);

router.route('/delete').delete(deleteGoalById);

router.put('/update/:id', updateSingleGoalById);

module.exports = router;
// router.route('/archived').get(getArchivedGoals)
// router.route('/:id').get(getSingleGoal).delete(deleteGoal)
// router.patch('/update/:id', updateSingleGoalById);

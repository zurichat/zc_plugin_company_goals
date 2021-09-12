/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { getSingleGoal, getAllGoals, createGoal, updateSingleGoalById, getArchivedGoals, deleteGoal } = require('../controllers/goalController');


const router = Router();

<<<<<<< HEAD
=======
router.route('/').post(createGoal).get(getAllGoals);
>>>>>>> 125b02986033554193e1abc512c209a90bb2a0f4

router.route('/').post(createGoals)
router.route('/').get(getAllGoals);

// router.route('/archived').get(getArchivedGoals)

// router.route('/:id').get(getSingleGoal).delete(deleteGoal)

router.route('/:id').get(getSingleGoal);

<<<<<<< HEAD
=======
router.route('/find').get(getSingleGoal).delete(deleteGoal)
>>>>>>> 125b02986033554193e1abc512c209a90bb2a0f4

// router.put('/update/:id', updateSingleGoalById);

module.exports = router;

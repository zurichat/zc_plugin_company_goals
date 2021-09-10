const { Router } = require('express');

const { getSingleGoal, getAllGoals, createGoals, updateSingleGoalById, getArchivedGoals, deleteGoal } = require('../controllers/goalController');


const router = Router();


router.route('/').post(createGoals)
router.route('/').get(getAllGoals);

// router.route('/archived').get(getArchivedGoals)

// router.route('/:id').get(getSingleGoal).delete(deleteGoal)

<<<<<<< Updated upstream
router.put('/update/:id', updateSingleGoalById);
=======
router.route('/:id').get(getSingleGoal);


// router.put('/update/:id', updateSingleGoalById);
>>>>>>> Stashed changes

module.exports = router;

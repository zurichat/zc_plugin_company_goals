const { Router } = require('express');

<<<<<<< HEAD
const { getAllGoals, updateGoalByID } = require('../controllers/goalController');

const router = Router();

router.get('/', getAllGoals);
router.patch('/update/:id', updateGoalByID);
=======
const { createGoals, getSingleGoal, getAllGoals } = require('../controllers/goalController');

const router = Router();


router.route('/').post(createGoals).get(getAllGoals);



router.route('/:id').get(getSingleGoal);

>>>>>>> ad421859ed36a302a0b967510e9d7f8ce334533f

module.exports = router;

const { Router } = require('express');

const { createGoals, getSingleGoal, getAllGoals } = require('../controllers/goalController');

const router = Router();

router.route('/').get(getAllGoals).post(createGoals);
router.route('/').post(createGoals).get(getAllGoals);



router.route('/:id').get(getSingleGoal);


module.exports = router;

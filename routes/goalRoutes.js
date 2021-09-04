const { Router } = require('express');

const {getAllGoals, createGoal} = require('../controllers/goalController');

const router = Router();

router.route('/').get(getAllGoals).post(createGoal);
const { createGoals, getSingleGoal, getAllGoals } = require('../controllers/goalController');

const router = Router();


router.route('/').post(createGoals).get(getAllGoals);



router.route('/:id').get(getSingleGoal);


module.exports = router;

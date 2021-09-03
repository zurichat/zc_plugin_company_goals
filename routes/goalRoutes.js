const { Router } = require('express');

const {getAllGoals, createGoal} = require('../controllers/goalController');

const router = Router();

router.route('/').get(getAllGoals).post(createGoal);



module.exports = router;

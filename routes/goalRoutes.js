const { Router } = require('express');

const { getAllGoals, updateGoalByID } = require('../controllers/goalController');

const router = Router();

router.get('/', getAllGoals);
router.patch('/update/:id', updateGoalByID);

module.exports = router;

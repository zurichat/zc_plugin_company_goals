const { Router } = require('express');

const deleteGoalController = require('../controllers/deleteGoalController');

const router = Router();

router.route('/').get(deleteGoalController.deleteGoal);

module.exports = router;

const { Router } = require('express');

const goalController = require('../controllers/goalController');

const router = Router();

router.route('/').post(goalController.createGoals).get(goalController.getAllGoals);

<<<<<<< HEAD
router.route('/').post(createGoals).get(getAllGoals);

router.route('/update').post(goalController.createGoals).patch(goalController.updateGoalByID)


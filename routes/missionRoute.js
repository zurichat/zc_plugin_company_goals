const { Router } = require('express');

const missionController = require('../controllers/missionController');

const router = Router();

router.route('/').post(missionController.createMission);

module.exports = router;
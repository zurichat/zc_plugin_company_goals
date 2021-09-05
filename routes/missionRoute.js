const { Router } = require('express');

const router = Router();

// require mission controller
const mission = require('../controllers/missionController');

router.post('/add', mission.createMission);
router.get('/', mission.getSingleMission);

// export module
module.exports = router;

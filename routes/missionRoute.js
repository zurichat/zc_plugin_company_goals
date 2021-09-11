const { Router } = require('express');
const mission = require('../controllers/missionController');

const router = Router();

router.post('/add', mission.createMission);
router.get('/:id', mission.getSingleMission);

// export module
module.exports = router;

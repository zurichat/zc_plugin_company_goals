const { Router } = require('express');
const mission = require('../controllers/missionController');

const router = Router();

// router.post('/add', mission.createMission);
router.get('/:organization_id', mission.getMission);

// export module
module.exports = router;

const { Router } = require('express');
const mission = require('../controllers/missionController');
const { verifyToken } = require('../middlewares/validate');

const router = Router();

// router.post('/add', mission.createMission);
router.get('/:organization_id', mission.getMission);
// router.put('/update', mission.updateMission);
router.put('/update/:organization_id', verifyToken, mission.updateMission);

// export module
module.exports = router;

const { Router } = require('express');
const mission = require('../controllers/missionController');
const { verifyToken, checkIsValidUser, requireRoles } = require('../middlewares/validate');

const router = Router();

// router.post('/add', mission.createMission);
router.get('/:organization_id', verifyToken, checkIsValidUser ,mission.getMission);
// router.put('/update', mission.updateMission);
router.put('/update/:organization_id', verifyToken, checkIsValidUser, requireRoles(['owner']),mission.updateMission);

// export module
module.exports = router;

const { Router } = require('express');
const { getVision, updateVision } = require('../controllers/visionController');
// const { verifyToken, requireRoles, checkIsValidUser } = require('../middlewares/validate');

const router = Router();

router.get('/:organization_id', getVision);
router.patch('/:organization_id', updateVision);

// export module
module.exports = router;

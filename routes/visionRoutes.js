const { Router } = require('express');
const vision = require('../controllers/visionController');
const { verifyToken } = require('../middlewares/validate');

const router = Router();

router.get('/all', vision.getAllVision);
router.get('/:id', vision.getSingleVision);
router.post('/create', vision.createVision);
router.patch('/:organization_id', verifyToken, vision.updateVision);

// export module
module.exports = router;

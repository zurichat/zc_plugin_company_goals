const { Router } = require('express');
const vision = require('../controllers/visionController');

const router = Router();

router.get('/all', vision.getAllVision)
router.get('/:id', vision.getSingleVision)
router.post('/create', vision.createVision);
router.patch('/:id', vision.updateVision);

// export module
module.exports = router;

const { Router } = require('express');

const router = Router();

// require vision controller
const vision = require('../controllers/visionController');

router.get('/all', vision.getAllVision)
router.get('/:id', vision.getSingleVision)
router.post('/create', vision.createVision);
router.patch('/:id', vision.updateVision);

// export module
module.exports = router;

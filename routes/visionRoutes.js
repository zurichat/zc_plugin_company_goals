const { Router } = require('express');

const router = Router();

// require vision controller
const vision = require('../controllers/visionController');

router.get('/', vision.getVision)
router.post('/create', vision.createVision);
router.patch('/:id', vision.updateVision);

// export module
module.exports = router;

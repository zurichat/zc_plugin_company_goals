const { Router } = require('express');
const { getAllVision, getSingleVision, createVision, updateVision} = require('../controllers/visionController');

const router = Router();

router.get('/all', getAllVision)
router.get('/:id', getSingleVision)
router.post('/create', createVision);
router.patch('/:id', updateVision);

// export module
module.exports = router;

const { Router } = require('express');

const router = Router();

// require vision controller
const vision = require('../controllers/visionController');

router.route('/').get(vision.getVision).post(vision.addVision);
router.patch('/:id', vision.updateVision);

// export module
module.exports = router;

const { Router } = require('express');
const { publish } = require('../controllers/centrifugoController');
const vision = require('../controllers/visionController');
const { verifyToken } = require('../middlewares/validate');

const router = Router();

router.get('/:organization_id', vision.getAllVision);
// router.get('/:id', vision.getSingleVision);
router.post('/create', vision.createVision);
router.patch('/:organization_id', verifyToken, vision.updateVision);

// DO NOT TOUCH (TESTING)
router.post('/', async (req, res) => {
  try {
    await publish('edit_vision', req.body.visionText);
    return res.status(200).send('Cool');
  } catch (error) {
    console.log('edit-vision-fail-api', error);
  }
});

// export module
module.exports = router;

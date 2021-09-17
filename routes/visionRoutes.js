const { Router } = require('express');
const { publish } = require('../controllers/centrifugoController');
const { getVision, updateVision } = require('../controllers/visionController');
const { verifyToken, requireRoles } = require('../middlewares/validate');

const router = Router();

router.get('/:organization_id', verifyToken, requireRoles(['admin', 'user', 'owner']), getVision);
router.patch('/:organization_id', verifyToken, requireRoles('admin'), updateVision);

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

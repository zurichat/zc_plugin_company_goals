const { Router } = require('express');

const router = Router();

// require mission controller
const vision = require('../controllers/visionController');

router.get('/company_vision', vision.getVision);
router.post('/add_company_vision', vision.addVision);
router.post('/edit_company_vision', vision.editVision);

// export module
module.exports = router;

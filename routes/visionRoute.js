const { Router } = require('express');

const router = Router();

// require vision controller
const vision = require('../controllers/visionController');

router.post('/', vision);

module.exports = router;

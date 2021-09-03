const { Router } = require('express');

const router = Router();

// require mission controller
const mission = require('../controllers/missionController');

router.get('/', mission);

// export module
module.exports = router;

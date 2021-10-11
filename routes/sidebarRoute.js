const { Router } = require('express');
const { getSidebar } = require('../controllers/sidebarController');

const router = Router();

router.get('/', getSidebar);

module.exports = router;

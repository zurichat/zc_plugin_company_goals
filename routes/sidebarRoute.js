const { Router } = require('express');
const {readSidebar} = require('../controllers/sidebarController.js');

const router = Router();

router.get('/', readSidebar);

module.exports = router;

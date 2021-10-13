const express = require('express');
const router = express.Router();
const { searchFile } = require('../controllers/searchController');
const { verifyToken, requireRoles } = require('../middlewares/validate');

//router.get('/files', verifyToken, requireRoles(['admin', 'user', 'owner']), searchFile);
router.get('/files', searchFile);

module.exports = router;

const { Router } = require('express');
const { syncReq } = require('../controllers/syncController');

const router = Router();

router.post('/', syncReq);

module.exports = router;

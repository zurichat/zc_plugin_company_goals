const { Router } = require('express');
const { getUserRooms } = require('../controllers/userController');

const router = Router();

router.route('/rooms').get(getUserRooms);

module.exports = router;

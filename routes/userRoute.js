const Router = require('express');
const getUserInfo = require('../controllers/userController');

const router = Router();

router.route('/').get(getUserInfo);

module.exports = router;

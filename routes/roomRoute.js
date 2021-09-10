const router = require('express').Router();
const {createRoom,joinRoom,removeUserFromRoom}  = require('../controllers/roomController');

// Create a room
router.route('/').get(createRoom);
router.route('/join').get(joinRoom);
router.route('/remove').get(removeUserFromRoom)

module.exports = router;
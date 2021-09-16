const router = require('express').Router();
const {getAllRooms, createRoom,joinRoom,removeUserFromRoom,getRoom, getUsersInaRoom}  = require('../controllers/roomController');

// Create a room
router.route('/all').get(getAllRooms)
router.route('/').get(createRoom);
router.route('/join').get(joinRoom);
router.route('/remove').get(removeUserFromRoom)
router.route('/room').get(getRoom)
// router.route('/room/:id').get(getUsersInaRoom);
module.exports = router;
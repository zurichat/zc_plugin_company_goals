const router = require('express').Router();
const {
  getAllRooms,
  // createRoom,
  joinRoom,
  removeUserFromRoom,
  getRoom,
  starRoom,
  // getUsersInaRoom,
} = require('../controllers/roomController');

// Create a room
// router.route('/').get(createRoom);
router.route('/:org_id/users/:member_id/room').get(getAllRooms);
router.route('/:org_id/room/:room_id/members/:member_id').post(joinRoom).patch(removeUserFromRoom);
router.route('/:org_id/room/:room_id').get(getRoom);
router.post('/:org_id/room/:room_id/members/:members_id', starRoom);
// router.route('/room/:id').get(getUsersInaRoom);
module.exports = router;

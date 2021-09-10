const router = require('express').Router();
const {getAllRooms, createRoom,joinRoom,removeUserFromRoom}  = require("../controllers/roomController");

// Create a room
router.route("/all").get(getAllRooms)
router.route("/").get(createRoom);
router.route('/join').get(joinRoom);
router.route('/remove').get(removeUserFromRoom)

module.exports = router;
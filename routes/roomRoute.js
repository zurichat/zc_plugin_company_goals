const router = require('express').Router();
const {createRoom,joinRoom, getUsersInRoom}  = require("../controllers/roomController");

// Create a room
router.route("/").get(createRoom);
router.route('/join').get(joinRoom);
router.get('/room', getUsersInRoom); 

module.exports = router;
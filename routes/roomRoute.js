const router = require('express').Router();
const {createRoom,joinRoom}  = require("../controllers/roomController");

// Create a room
router.route("/").get(createRoom);
router.route('/join').get(joinRoom);

module.exports = router;
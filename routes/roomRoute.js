const router = require('express').Router();
const {createRoom}  = require("../controllers/roomController");

// Create a room
router.route("/").get(createRoom);

module.exports = router;
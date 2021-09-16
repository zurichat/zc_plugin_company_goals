const { Router } = require('express');
const {
  fetchNotifications,
  updateNotification,
  updateNotifications,
  deleteNotification
} = require('../controllers/notificationController');

const router = Router();

router.get('/', fetchNotifications)
router.put('/', updateNotification)
router.put('/', updateNotifications)
router.delete('/', deleteNotification)


module.exports = router;
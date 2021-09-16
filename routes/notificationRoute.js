const { Router } = require('express');
const {
  getUserNotifications,
  updateNotification,
  updateNotifications,
  deleteNotification
} = require('../controllers/notificationController');

const router = Router();

router.get('/', getUserNotifications)
router.put('/', updateNotification)
router.put('/all', updateNotifications)
router.delete('/', deleteNotification)


module.exports = router;
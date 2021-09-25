const { Router } = require('express');
const {
  getUserNotifications,
  updateNotification,
  updateNotifications,
  deleteNotification,
  getAllNotifications,
  deleteNotifications
} = require('../controllers/notificationController');

const router = Router();

router.get('/', getUserNotifications)
router.put('/', updateNotification)
router.put('/all', updateNotifications)
router.delete('/', deleteNotification)
//router.get('/all', getAllNotifications)
//router.delete('/all', deleteNotifications)


module.exports = router;
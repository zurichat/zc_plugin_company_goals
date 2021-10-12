const { find } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

/**
 * Send all notifications for a given user
 * @param {string} orgID Organization id
 * @param {string} userID User id
 */
const sendNotification = async (orgID, userID, page = null, limit = null) => {
  if (!orgID) {
    return new AppError(`org_id is required`, 403);
  }

  if (!userID) {
    return new AppError(`user_id is required`, 403);
  }

  try {
    // Search for all Goals
    const notifications = await find('goalNotifications', { org_id: orgID, user_id: userID }, orgID);

    const {
      data: { data: notifs },
    } = notifications;

    if (!notifs || notifs.length < 1) {
      return { data: [] };
    }

    if (page > 0 && limit > 0) {
      const newPage = page * 1 || 1;
      const perPage = limit * 1 || 7;

      // Calculate the start and end index
      const start = (newPage - 1) * perPage;
      const end = newPage * perPage;

      // Grab selected notifications
      const slicedNotifs = notifs.slice(start, end);

      const payload = {
        currentPage: newPage,
        totalDocuments: notifications.data.data.length,
        documentPerPage: limit * 1,
        data: slicedNotifs,
      };

      return payload;
    }

    // Return unpaginated notifications
    return { data: notifs };
  } catch (error) {
    if (error.isOperational) {
      return error;
    }
    return new AppError(`Something unexpected occured`, 500);
  }
};

module.exports = { sendNotification };

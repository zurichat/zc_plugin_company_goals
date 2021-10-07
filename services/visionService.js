/* eslint-disable no-underscore-dangle */
const { publish } = require('../controllers/centrifugoController');
const { createNotification } = require('../controllers/notificationController');
const { find, updateOne } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

const USER_IDS = ['6145cf0c285e4a1840207426', '6145cefc285e4a1840207423', '6145cefc285e4a1840207429'];

/**
 * Service for fetching an organizations vision, and inserting an empty vision if none exists.
 * @param {string} orgID User's organization id
 * @returns null | {}
 */
const findVision = async (orgID) => {
  if (!orgID) return new AppError('No organization id was provided', 500);

  let vision;

  try {
    const {
      data: { data },
    } = await find('vision', { organization_id: orgID }, orgID);

    // Check for multiple vision objects
    if (Array.isArray(data)) {
      [vision] = data;
    } else {
      vision = { ...data, orgID };
    }

    // If no vision exists -- case 1 (no error thrown)
    if (!vision.vision) {
      const payload = { vision: '', orgID };
      vision = payload;
    }
  } catch (error) {
    // If no vision exists -- case 2 (error thrown)
    if (error.message.toLowerCase().includes('find')) {
      const payload = { vision: '', orgID };
      return payload;
    }
    return error;
  }

  return vision;
};

module.exports = {
  findVision,
};

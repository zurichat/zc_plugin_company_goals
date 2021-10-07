/* eslint-disable no-lonely-if */
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

    // If no vision exists -- case 1 (no error thrown)
    if (!data) {
      vision = { vision: '', orgID };
    } else {
      // Check for multiple vision objects
      if (Array.isArray(data)) {
        [vision] = data;
      } else {
        vision = { ...data, orgID };
      }
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

/**
 * Service for fetching an organizations vision, and inserting an empty vision if none exists.
 * @param {string} orgID User's organization id
 * @returns null | {}
 */
const insertVision = async (orgID, vision) => {
  if (!orgID) return new AppError('No organization id was provided', 500);
  if (!vision) return new AppError('No vision was provided', 500);

  try {
    let payload;

    const {
      data: { data: oldVision },
    } = await find('vision', { organization_id: orgID }, orgID);

    // If no vision exists -- case 1 (no error thrown)
    if (!oldVision || !oldVision.vision) {
      return new AppError('No vision exists for this organization', 404);
    }

    // Check for multiple vision objects
    if (Array.isArray(oldVision)) {
      [payload] = oldVision;
    } else {
      payload = oldVision;
    }

    // Update matched vision
    const updatedVision = await updateOne('vision', { vision }, { organization_id: orgID }, orgID, payload._id);

    // Send notification to all users.
    if (updatedVision.data.data.modified_documents > 0) {
      await publish('goals-publish-vision-update', vision);
      await createNotification(USER_IDS, orgID, '', '', 'updateVision');
    }

    return vision;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findVision,
  insertVision,
};

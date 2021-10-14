/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable import/order */

const { default: axios } = require('axios');
const { request, response } = require('express');
const {
  find,
  insertMany,
  deleteOne,
  updateOne,
  updateMany,
  findAll,
  deleteMany,
  advancedRead,
} = require('../db/databaseHelper');
const notificationService = require('../services/notification.service');
const AppError = require('../utils/appError');
const logger = require('../utils/logger.js');
const { publish } = require('./centrifugoController');
const updateSideBar = require('../utils/updateSidebarUnread');

const notificationStructure = {
  achievedGoal: [
    'Our goal has been achieved.',
    'Congratulations, we have achieved this goal. All set targets have been met.',
    'green',
  ],
  createGoal: ['A new goal has been created.', 'We have within the stipulated time to achieve this goal.', 'purple'],
  deleteGoal: ['One of our goals has been deleted.', 'We will no longer be working towards this goal.', 'red'],
  expiredGoal: [
    'We failed to reach this goal.',
    'Unfortunately, we have been unable to achieve this goal within the set time frame.',
    'red',
  ],
  updateGoal: ['This goal has been updated.', 'Please check the goal info for details.', 'blue'],

  updateMission: ['Our mission has been updated.', '', 'blue'],
  updateVision: ['Our vision has been updated.', '', 'blue'],
};

// exports.getUserIds = async (tokenHeader, orgId) => {
//   // const tokenHeader = req.headers.authorization
//   try {
//     const userIds = [];
//     let organization = await axios({
//       method: 'get',
//       url: `https://api.zuri.chat/organizations/${orgId}/members`,
//       headers: { Authorization: tokenHeader },
//     });

//     organization = organization.data.data;
//     for (user of organization) {
//       userIds.push(user._id);
//     }
//     return userIds;
//   } catch (error) {
//     logger.info(`The get operation failed with the following error messages: ${error}`);
//   }
// };

exports.createNotification = async (userIds, orgId, goalId, goalName, funcName) => {
  try {
    const notifications = [];

    const myFunc = (id) => {
      const notification = {
        user_id: id,
        org_id: orgId,
        goal_id: goalId,
        header: notificationStructure[funcName][0],
        goalName,
        isRead: false,
        colour: notificationStructure[funcName][2],
        description: notificationStructure[funcName][1],
        createdAt: Date.now(),
      };
      notifications.push(notification);
    };
    // userIds.forEach(myFunc);

    const { data } = await axios.post('https://api.zuri.chat/auth/login', {
      email: 'creator@goals.com',
      password: 'Password123##',
    });

    const tokenHeader = data.data.user.token;

    let allMembers = await axios({
      method: 'get',
      url: `https://api.zuri.chat/organizations/${orgId}/members`,
      headers: {
        Authorization: tokenHeader,
      },
    });

    allMembers = allMembers.data.data;

    const memberIds = allMembers.map((member) => {
      return member._id;
    });

    memberIds.forEach(myFunc);

    const Notification = await insertMany('goalNotifications', notifications, orgId);
    const goalNotification = notifications[0];
    goalNotification._id = Notification.data.data.object_ids[0];

    // publishing to centrifugo
    // general notifications
    await publish('goals-general-notifications', goalNotification);

    // sidebar update due to notifications
    await updateSideBar(memberIds, orgId);

    return goalNotification;
  } catch (error) {
    logger.info(`The write operation failed with the following error messages: ${error}`);
  }
};

/**
 * GET all user notifications.
 * @param { request } req Express request object
 * @param { response } res Express response object
 */
exports.getUserNotifications = async (req, res) => {
  const { org_id: orgId, user_id: userId, page, limit } = req.query;

  try {
    // Call service to retrieve user notifications
    const notifs = await notificationService.getNotifications(orgId, userId, page, limit);

    // If an error was returned
    if (notifs instanceof Error) throw notifs;

    return res.status(200).json({ statusCode: 200, message: 'success', ...notifs });
  } catch (error) {
    // If programmatic error
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        error: error.status,
      });
    }
    // If unexpected error
    res.status(500).json({
      statusCode: 500,
      message: `Something unexpected occured`,
      error: 'Server Error',
    });
  }
};

exports.updateNotification = async (req, res) => {
  const { notification_id: notificationId } = req.params;
  const { org_id: orgId, user_id: userId } = req.query;

  // Check for org_id, user_id and notification_id
  if (!orgId) {
    return res.status(400).send({
      error: 'org_id is required',
    });
  }
  if (!userId) {
    return res.status(400).send({
      error: 'user_id is required',
    });
  }
  if (!notificationId) {
    return res.status(400).send({
      error: 'notification_id is required',
    });
  }

  // Check for existence of notification.
  const notification = await find(
    'goalNotifications',
    {
      _id: notificationId,
    },
    orgId
  );

  if (!notification || notification.data.data === null) {
    return res.status(400).send({
      error: 'This notification does not exist.',
    });
  }

  const status = notification.data.data.isRead;
  const update = {
    isRead: !status,
  };
  try {
    // Update notification
    const updatedNotification = await updateOne('goalNotifications', update, {}, orgId, notificationId);
    await updateSideBar([userId], orgId);

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: updatedNotification.data.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Unable to update this notification: ${error.message}`,
    });
  }
};

exports.updateNotifications = async (req, res) => {
  const { org_id: orgId, user_id: userId } = req.query;

  // Check for org_id and user_id
  if (!orgId) {
    return res.status(403).send({
      error: 'org_id is required',
    });
  }
  if (!userId) {
    return res.status(403).send({
      error: 'user_id is required',
    });
  }

  const filter = {
    org_id: orgId,
    user_id: userId,
  };

  const update = {
    isRead: true,
  };

  try {
    // Update all notifications.
    const updatedNotifications = await updateMany('goalNotifications', update, filter, orgId);
    await updateSideBar([userId], orgId);
    // Returning response.
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: updatedNotifications.data.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Unable to mark all notifications: ${error.message}`,
    });
  }
};

exports.deleteNotification = async (req, res) => {
  const { notification_id: notificationId } = req.params;
  const { org_id: orgId, user_id: userId } = req.query;

  // Check for org_id, user_id and notification_id
  if (!orgId) {
    return res.status(403).send({
      error: 'org_id is required',
    });
  }

  if (!userId) {
    return res.status(403).send({
      error: 'user_id is required',
    });
  }

  if (!notificationId) {
    return res.status(403).send({
      error: 'notification_id is required',
    });
  }

  try {
    // Deleting the notification
    const deletedNotification = await deleteOne('goalNotifications', orgId, notificationId);
    await updateSideBar([userId], orgId);
    // Returning response.
    return res.status(200).json({
      status: 200,
      message: deletedNotification.data.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Unable to delete this notification: ${error.message}`,
    });
  }
};

// // This is not for frontend consumption
// exports.getAllNotifications = async (req, res) => {
//   const orgId = '6145d099285e4a184020742e';

//   try {
//     // Search for all Goals
//     const notifications = await findAll('goalNotifications', orgId);

//     // Returning Response
//     return res.status(200).json({
//       status: 200,
//       message: 'success',
//       data: notifications.data.data,
//     });
//   } catch (error) {
//     return res.status(200).json({
//       status: 200,
//       message: "You don't have any notifications.",
//     });
//   }
// };

// // This is not for frontend consumption
// exports.deleteNotifications = async (req, res) => {
//   const { org_id: orgId, user_id: userId } = req.query;

//   // Check for org_id and user_id
//   if (!orgId) {
//     return res.status(403).send({
//       error: 'org_id is required',
//     });
//   }

//   try {
//     await deleteMany(
//       'goalNotifications',
//       {
//         org_id: orgId,
//       },
//       orgId
//     );
//     return res.status(200).json('All notifications deleted.');
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Unable to delete all notifications.',
//     });
//   }
// };

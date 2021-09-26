/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { find, insertMany, deleteOne, updateOne, updateMany, findAll, deleteMany } = require('../db/databaseHelper');
const logger = require('../utils/logger');
const { publish } = require('./centrifugoController');

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
  if (typeof userIds === 'string') {
    userIds = [userIds];
  }

  try {
    const notifications = [];
    for (id of userIds) {
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
    }

    const Notification = await insertMany('goalNotifications', notifications, orgId);
    const goalNotification = notifications[0];
    goalNotification._id = Notification.data.data.object_ids[0];
    await publish('goalNotifications', goalNotification);
    return goalNotification;
  } catch (error) {
    logger.info(`The write operation failed with the following error messages: ${error}`);
  }
};

exports.getUserNotifications = async (req, res) => {
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
  try {
    // Search for all Goals
    const notifications = await find(
      'goalNotifications',
      {
        org_id: orgId,
        user_id: userId,
      },
      orgId
    );

    if (notifications.data.data == null || notifications.data.data.length < 1) {
      return res.status(200).json({
        status: 200,
        // eslint-disable-next-line quotes
        message: "You don't have any notifications.",
      });
    }
    
    // if (notifications.data.data.length > 10) {
    //   return res.status(200).json({
    //     status: 200,
    //     message: 'success',
    //     data: notifications.data.data.slice(-10),
    //   });
    // }

    // Returning Response
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: notifications.data.data,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      // eslint-disable-next-line quotes
      message: error.message,
    });
  }
};

exports.updateNotification = async (req, res) => {
  const { org_id: orgId, user_id: userId, notification_id: notificationId } = req.query;

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
  if (!notificationId) {
    return res.status(403).send({
      error: 'notification_id is required',
    });
  }

  const notification = await find(
    'goalNotifications',
    {
      _id: notificationId,
    },
    orgId
  );

  if (!notification || notification.data.data === null) {
    return res.status(400).send({
      error: "This notification doesn't exist.",
    });
  }

  const status = notification.data.data.isRead;
  const update = {
    isRead: !status,
  };
  try {
    await updateOne('goalNotifications', update, {}, orgId, notificationId);

    const Notification = await find(
      'goalNotifications',
      {
        _id: notificationId,
      },
      orgId
    );

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: Notification.data.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      // eslint-disable-next-line quotes
      message: 'Unable to update this notification',
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
    await updateMany('goalNotifications', update, filter, orgId);

    const notifications = await find('goalNotifications', filter, orgId);

    if (notifications.data.data.length > 10) {
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: notifications.data.data.slice(-10),
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: notifications.data.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Unable to mark all notifications read.',
    });
  }
};

exports.deleteNotification = async (req, res) => {
  const { org_id: orgId, user_id: userId, notification_id: notificationId } = req.query;

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
    const deletedNotification = await deleteOne('goalNotifications', orgId, notificationId);

    return res.status(200).json({
      status: 200,
      message: deletedNotification.data.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Unable to delete this notification.',
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
//   if (!userId) {
//     return res.status(403).send({
//       error: 'user_id is required',
//     });
//   }

//   try {
//     await deleteMany(
//       'goalNotifications',
//       {
//         org_id: orgId,
//         user_id: userId,
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

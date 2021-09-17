/* eslint-disable no-unused-vars */
const { find, insertOne, deleteOne, updateOne, updateMany } = require('../db/databaseHelper');
const { notificationSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const notificationStructure = {
    assignGoal: [
        'You have been assigned a new goal.', 
        'Your team and you have within the stipulated time to achieve this goal.'
    ],
    achievedGoal: [
        'Our goal has been achieved.', 
        'Congratulations, you have achieved this goal. All set targets have been met.'
    ],
    expiredGoal: [
        'We failed to reach this goal.',
        'Unfortunately, you have been unable to achieve this goal within the set timeframe.'
    ]
};

exports.createNotification = async (userId, orgId, goalName, funcName) => {
    const notification = {
        user_id: userId,
        org_id: orgId,
        header: notificationStructure[funcName][0],
        goalName,
        status: 'unread',
        description: notificationStructure[funcName][1],
        createdAt: Date.now()
      };
        await notificationSchema.validateAsync(notification);
        await insertOne('notifications', notification, orgId);
};

exports.getUserNotifications = catchAsync(async (req, res, next) => {
    const { org_id: orgId, user_id: userId } = req.query;
    
    // Check for org_id and user_id
    if (!orgId) {
      return res.status(403).send({error: 'org_id is required'})
    }
    if (!userId) {
        return res.status(403).send({error: 'user_id is required'})
    }
    try {
        // Search for all Goals
        const goals = await find('notifications', { org_id: orgId, user_id: userId }, orgId);
  
        // Returning Response
        res.status(200).json({ status: 200, message: 'success', data: goals.data.data })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'There was an error processing this request.' })
    }
    
});

exports.updateNotification = catchAsync(async (req, res, next) => {
    const { org_id: orgId, user_id: userId, notification_id: notificationId } = req.query;

    // Check for org_id and user_id
    if (!orgId) {
        return res.status(403).send({error: 'org_id is required'})
      }
    if (!userId) {
        return res.status(403).send({error: 'user_id is required'})
    }
    if (!notificationId) {
        return res.status(403).send({error: 'notification_id is required'})
    }
    const update = {status: 'read'}
    try {
        await updateOne('notifications', update, {}, orgId, notificationId)
        return res.status(200).json('Notification read.')
    } catch (error) {
        return next(new AppError('An error has eoccured while processing this request', 500));
    }
});

exports.updateNotifications = catchAsync(async (req, res, next) => {
    const { org_id: orgId, user_id: userId } = req.query;

    // Check for user_id and organization_id
    if (!orgId) {
        return next(new AppError('organization_id is required', 403));
      }
    if (!userId) {
        return next(new AppError('user_id is required', 403));
    }

    const update = {status: 'read'}
    try {
        await updateMany('notifications', update, { org_id: orgId, user_id: userId }, orgId)
        return res.status(200).json('All notifications read.')
    } catch (error) {
        return next(new AppError('An error has eoccured while processing this request', 500));
    }
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
    const { org_id: orgId, user_id: userId, notification_id: notificationId } = req.query;

    // Check for org_id and user_id
    if (!orgId) {
        return res.status(403).send({error: 'org_id is required'})
      }
    if (!userId) {
        return res.status(403).send({error: 'user_id is required'})
    }
    if (!notificationId) {
        return res.status(403).send({error: 'notification_id is required'})
    }
    try {
        await deleteOne('notifications', orgId, notificationId)
        return res.status(200).json('Notification deleted.')
    } catch (error) {
        return next(new AppError('An error has eoccured while processing this request', 500));
    }
})
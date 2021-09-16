const { findAll, insertOne, deleteOne, updateOne, updateMany } = require('../db/databaseHelper');
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
        organization_id: orgId,
        header: notificationStructure[funcName][0],
        goalName,
        status: 'unread',
        description: notificationStructure[funcName][1],
        createdAt: Date.now()
      };
        await notificationSchema.validateAsync(notification);
        await insertOne('notifications', notification, orgId);
};

exports.fetchNotifications = catchAsync(async (req, res, next) => {
    const { org_id: orgId, user_id: userId } = req.query;
    
    // Check for user_id and organization_id
    if (!orgId) {
        return next(new AppError('organization_id is required', 403));
    }
    if (!userId) {
        return next(new AppError('user_id is required', 403));
      }

    // Search for all Goals
    const userNotifications = await findAll('notifications', {userId, orgId}, orgId);
  
    // Returning Response
    res.status(200).json({ status: 200, message: 'success', data: userNotifications.data.data })
});

exports.updateNotification = catchAsync(async (req, res, next) => {
    const { org_id: orgId, user_id: userId, notification_id: notificationId } = req.query;

    // Check for user_id and organization_id
    if (!orgId) {
        return next(new AppError('organization_id is required', 403));
      }
    if (!userId) {
        return next(new AppError('user_id is required', 403));
    }
    if (!notificationId) {
        return next(new AppError('notification_id is required', 403));
    }

    const update = {status: 'read'}
    try {
        await updateOne('notifications', update, { _id: notificationId }, orgId)
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

    // Check for user_id and organization_id
    if (!orgId) {
        return next(new AppError('organization_id is required', 403));
      }
    if (!userId) {
        return next(new AppError('user_id is required', 403));
    }
    if (!notificationId) {
        return next(new AppError('notification_id is required', 403));
    }

    try {
        await deleteOne('notifications', orgId, notificationId)
        return res.status(200).json('Notification deleted successfully.')
    } catch (error) {
        return next(new AppError('An error has eoccured while processing this request', 500));
    }
});
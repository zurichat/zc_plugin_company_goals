/* eslint-disable no-unused-vars */
const {
    find,
    insertOne,
    deleteOne,
    updateOne,
    updateMany
} = require('../db/databaseHelper');
const {
    notificationSchema
} = require('../schemas');
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
    ],
    deleteGoal: [
        // eslint-disable-next-line quotes
        "A goal you're assigned to has been deleted.",
        'We will no longer be working towards this goal.'
    ],
    unassignGoal: [
        'You have been unassigned from this goal',
        'You will no longer get updates for this goal.'
    ]
};

exports.createNotification = async (req, res, userId, orgId, goalName, funcName) => {
    const notification = {
        user_id: userId,
        org_id: orgId,
        header: notificationStructure[funcName][0],
        goalName,
        status: 'unread',
        description: notificationStructure[funcName][1],
        createdAt: Date.now()
    };

    try {
        await notificationSchema.validateAsync(notification);
    } catch (error) {
        return res.status(400).json(error.details)
    }

    try {
        await insertOne('notifications', notification, orgId);
    } catch (error) {
        return res.status(500).json(error.details)
    }
};

exports.getUserNotifications = async (req, res, next) => {
    const {
        org_id: orgId,
        user_id: userId
    } = req.query;

    // Check for org_id and user_id
    if (!orgId) {
        return res.status(403).send({
            error: 'org_id is required'
        })
    }
    if (!userId) {
        return res.status(403).send({
            error: 'user_id is required'
        })
    }
    try {
        // Search for all Goals
        const notifications = await find('notifications', {
            org_id: orgId,
            user_id: userId
        }, orgId);

        // Returning Response
        res.status(200).json({
            status: 200,
            message: 'success',
            data: notifications.data.data
        })
    } catch (error) {
          res.status(200).json({
            status: 200,
            // eslint-disable-next-line quotes
            message: "You don't have any notifications."
        })
    }

};

exports.updateNotification = catchAsync(async (req, res, next) => {
    const {
        org_id: orgId,
        user_id: userId,
        notification_id: notificationId
    } = req.query;

    // Check for org_id and user_id
    if (!orgId) {
        return res.status(403).send({
            error: 'org_id is required'
        })
    }
    if (!userId) {
        return res.status(403).send({
            error: 'user_id is required'
        })
    }
    if (!notificationId) {
        return res.status(403).send({
            error: 'notification_id is required'
        })
    }
    const update = {
        status: 'read'
    }
    try {
        await updateOne('notifications', update, { _id: notificationId }, orgId, notificationId)
        return res.status(200).json('Notification read.')
    } catch (error) {
        res.status(500).json({
            status: 500,
            // eslint-disable-next-line quotes
            message: "Unable to update this notification"
        })
    }
});

exports.updateNotifications = catchAsync(async (req, res, next) => {
    const {
        org_id: orgId,
        user_id: userId
    } = req.query;

    // Check for org_id and user_id
    if (!orgId) {
        return res.status(403).send({
            error: 'org_id is required'
        })
    }
    if (!userId) {
        return res.status(403).send({
            error: 'user_id is required'
        })
    }

    const update = {
        status: 'read'
    }
    try {
        await updateMany('notifications', update, {
            org_id: orgId,
            user_id: userId
        }, orgId)
        return res.status(200).json('All notifications read.')
    } catch (error) {
        res.status(500).json({
            status: 500,
            // eslint-disable-next-line quotes
            message: "Unable to mark all notifications read."
        })
    }
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
    const {
        org_id: orgId,
        user_id: userId,
        notification_id: notificationId
    } = req.query;

    // Check for org_id, user_id and notification_id
    if (!orgId) {
        return res.status(403).send({
            error: 'org_id is required'
        })
    }

    if (!userId) {
        return res.status(403).send({
            error: 'user_id is required'
        })
    }

    if (!notificationId) {
        return res.status(403).send({
            error: 'notification_id is required'
        })
    }
    
    try {
        await deleteOne('notifications', orgId, notificationId)
        return res.status(200).json('Notification deleted.')
    } catch (error) {
        res.status(500).json({
            status: 500,
            // eslint-disable-next-line quotes
            message: "Unable to delete this notification"
        })
    }
})
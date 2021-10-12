const { findAll } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

exports.getChartInfo = catchAsync(async (req, res, next) => {
  const { org_id: orgId } = req.query;

  if (!orgId) {
    logger.info(`Can't get goals for null organisation id... Exiting...`);
    return res.status(400).send({ error: 'org_id is required' });
  }

  try {
    const goalsData = await findAll('goals', orgId);
    const allGoals = goalsData.data.data;
    const result = { totalGoals: allGoals.length };
    const { totalGoals } = result;
    let isInComplete = 0;
    let isNotExpired = 0;

    allGoals.forEach((goal) => {
      if (!goal.is_complete) {
        if (isInComplete > 0) {
          isInComplete += 1;
        } else {
          isInComplete = 1;
        }
        result.isComplete = totalGoals - isInComplete;
      }

      if (!goal.is_expired) {
        // isNotExpired > 0 ? isNotExpired + 1 : isNotExpired = 1

        if (isNotExpired > 0) {
          isNotExpired += 1;
        } else {
          isNotExpired = 1;
        }

        result.isExpired = totalGoals - isNotExpired;
      }

      if (goal.start_date && !goal.is_expired && !goal.is_complete) {
        // result['inProgress'] >= 0 ?  result['inProgress'] + 1 : result['inProgress'] = 1

        if (result.inProgress >= 0) {
          result.inProgress += 1;
        } else {
          result.inProgress = 1;
        }
      }
    });

    next();
    return res.status(200).json({ message: 'success', data: result });
  } catch (error) {
    logger.info(`Something went wrong because: ${error.message}`);
    res.status(500).json({ message: 'failed, Server Error', data: null });
  }
});

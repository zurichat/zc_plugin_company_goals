// const { find } = require('../db/databaseHelper');
// const AppError = require('../utils/appError');

/**
 * Service for creating goal targets
 * @param {string} orgID User's organization id
 */

// const findTarget = async(res, org_id) => {
//     logger.info(`Getting goal targets for all goals ${org_id}`);

//     if (!org_id) {
//       logger.info(`Organization id isn't provided.`);
//       return new AppError("Organization_id is required", 400);
//     }

//     try {
//       const allTargets = await findAll('targets', org_id);
//       return res.status(200).json({ status: 200, data: allTargets.data });
//     } catch (err) {
//       if (err) return new AppError(err.details, 400)
//     }
// }

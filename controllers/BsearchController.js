/* eslint-disable no-useless-escape */
/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { find, findAll } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger.js');

exports.searchGoals = catchAsync(async (req, res, next) => {
  const { org_id: orgId, search, page, limit, type: goalType } = req.query;

  if (!orgId) {
    logger.info(`Can't get goals for null organisation id... Exiting...`);
    return res.status(400).send({ error: 'org_id is required' });
  }

  // Search for all Goals
  try {
    logger.info(`Started getting all goals for the organization: ${orgId}`);
    let findGoals;
    if (goalType) {
      findGoals = await find('goals', { goal_type: goalType }, orgId);
    } else {
      findGoals = await findAll('goals', orgId);
    }
    const { data: goals } = findGoals.data;

    // No matching data, return an empty array
    if (goals === null || goals.length < 1) return res.status(200).json({ message: 'success', data: [] });

    let sorted;
    // 200, response
    if (findGoals.data.status === 200 && goals.length > 0) {
      sorted = goals
        .sort((a, b) => {
          const c = new Date(a.created_at);
          const d = new Date(b.created_at);
          return c - d;
        })
        .reverse();

      let newGoals = sorted;

      if (search) {
        newGoals = newGoals.filter((goal) => {
          if (!goal.description) {
            // eslint-disable-next-line no-param-reassign
            goal.description = '';
          }
          return (
            goal.goal_name.toLowerCase().includes(search.toLowerCase()) ||
            goal.description.toLowerCase().includes(search.toLowerCase())
          );
        });

        if (page && limit) {
          const newPage = page * 1 || 1;
          const perPage = limit * 1 || 5;

          // Calculate the start and end index
          const start = (newPage - 1) * perPage;
          const end = newPage * perPage;

          // Paginated goals
          const searchGoals = newGoals.slice(start, end);
          const result = {
            status: 200,
            message: 'success',
            currentPage: newPage,
            count: newGoals.length,
            totalDocumentsonpage: searchGoals.length,
            documentPerPage: limit * 1,
            result: searchGoals,
          };
          if (page !== 1) {
            result.prev = `goals.zuri.com/api/v1/goals/?org_id=6145d099285e4a184020742e&search=${search}&page=${
              page - 1
            }&limit=${limit}`;
            if (newGoals.length > (page - 1) * limit + searchGoals.length) {
              result.next = `goals.zuri.com/api/v1/goals/?org_id=6145d099285e4a184020742e&search=${search}&page=${
                page + 1
              }&limit=${limit}`;
            }
          } else if (newGoals > searchGoals) {
            result.next = `goals.zuri.com/api/v1/goals/?org_id=6145d099285e4a184020742e&search=${search}&page=${
              page + 1
            }&limit=${limit}`;
          }

          return res.status(200).json(result);
        }

        // Sending response
        return res.status(200).json({
          status: 200,
          message: 'success',
          count: newGoals.length,
          result: newGoals,
        });
      }

      // Sending response
      return res.status(200).json({
        status: 400,
        message: 'fali',
        data: [],
      });
    }
  } catch (error) {
    logger.info('no goals for this organization');
    console.log(error);
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: [],
    });
  }
});

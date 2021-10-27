// eslint-disable-next-line no-unused-vars
const { request, response } = require('express');
const { getResults } = require('../services/search.service');

/**
 * Search controller
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
exports.searchFunction = async (req, res) => {
  const { org_id: orgID, member_id: memberID } = req.params;
  const { q, filter, page, limit } = req.query;

  try {
    const result = await getResults(orgID, memberID, q, filter, page, limit);

    if (result instanceof Error) {
      throw result;
    }

    const payload = {
      status: 'ok',
      statusCode: 200,
      ...result,
    };

    return res.status(200).json(payload);
  } catch (error) {
    if (error.isOperational) {
      return res
        .status(error.statusCode)
        .json({ message: error.message, error: error.status, statusCode: error.statusCode });
    }
    return res.status(500).json({ status: 'fail', statusCode: 500, message: error.message });
  }
};

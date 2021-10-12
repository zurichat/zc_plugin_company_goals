const { findAll } = require('../db/databaseHelper');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger.js');

exports.searchPlugin = catchAsync(async (req, res) => {
  // eslint-disable-next-line camelcase
  const { search, org_id } = req.query;
  try {
    // eslint-disable-next-line camelcase
    if (!org_id) {
      logger.info(`Can't get goals for null organisation id... Exiting...`);
      return res.status(400).send({ error: 'org_id is required' });
    }
    // const pluginUrl = 'https://api.zuri.chat/marketplace/plugins';
    // const pluginUrl = `http://localhost:4000/api/v1/goals?org_id=${org_id}`;
    // const { data } = await axios.get(pluginUrl);

    if (search) {
      const { data } = await findAll('goals', org_id);
      const newArray = data.data.filter((el) => el.goal_name.toLowerCase().includes(search.toLowerCase())); // || el.description.includes(search.toLowerCase));

      const response = {
        status: 200,
        message: 'success',
        data: newArray,
      };

      res.status(200).json(response);
    } else {
      const { data } = await findAll('goals', org_id);

      res.status(200).json(data);
    }
  } catch (e) {
    res.status(400).json({ e });
  }
});

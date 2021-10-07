const { insertOne, find } = require('../db/databaseHelper');

exports.findVision = async (orgID) => {
  if (!orgID) return null;

  let vision;

  try {
    const {
      data: { data },
    } = await find('vision', { organization_id: orgID }, orgID);

    // Check for multiple vision objects
    if (Array.isArray(data)) {
      [vision] = data;
    } else {
      vision = { ...data, orgID };
    }

    // If no vision exists -- case 1 (no error thrown)
    // Then insert a new vision
    if (!data) {
      const payload = { vision: '', orgID };
      await insertOne('vision', payload, orgID);
      vision = payload;
    }
  } catch (error) {
    // If no vision exists -- case 2 (error thrown)
    // Then insert a new vision
    if (error.statusCode === 500) {
      const payload = { vision: '', orgID };
      await insertOne('vision', payload, orgID);
      vision = payload;
    } else {
      vision = null;
    }
  }

  return vision;
};

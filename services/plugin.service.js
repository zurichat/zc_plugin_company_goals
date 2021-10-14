const axios = require('axios');
const AppError = require('../utils/appError');
const {
  payload: { plugin_id: pluginID },
} = require('../utils/config').DATABASE;

const verifyTokenAndVerifyMemberID = async (orgID, memberID, AuthStr) => {
  const URL = `https://api.zuri.chat/auth/verify-token`;
  const URL_ORG = `https://api.zuri.chat/organizations`;
  let setError;
  let validationStatus;

  if (!orgID) {
    setError = 'Organization id is required';
    throw new AppError(setError, 400);
  }

  if (!memberID) {
    setError = 'Member Id is required';
    throw new AppError(setError, 400);
  }

  try {
    const verifyToken = await axios.get(URL, {
      headers: {
        Authorization: AuthStr,
      },
    });

    const { user } = verifyToken.data.data;

    if (user) {
      const verifyMemberID = await axios.get(`${URL_ORG}/${orgID}/members?query=${user.email}`, {
        headers: {
          Authorization: AuthStr,
        },
      });

      const result = verifyMemberID.data.data;
      const { _id: compareID } = result[0];

      if (compareID === memberID) {
        validationStatus = 'validation success';
      }
      return validationStatus;
    }
    return new AppError('validation failed', 400);
  } catch (error) {
    return error;
  }
};

const installPluginControl = async (orgID, memberID, AuthStr) => {
  let setError;

  const config = {
    data: {
      plugin_id: pluginID,
      user_id: memberID,
    },
    url: `https://api.zuri.chat/organizations/${orgID}/plugins`,
    headers: {
      Authorization: AuthStr,
    },
  };

  if (!orgID) {
    setError = 'Organization id is required';
    throw new AppError(setError, 400);
  }

  if (!memberID) {
    setError = 'Member Id is required';
    throw new AppError(setError, 400);
  }

  try {
    const installGoalPlugin = await axios.post(config.url, config.data, { headers: config.headers });

    const { data: response } = installGoalPlugin;

    return response.data;
  } catch (error) {
    const { data } = error.response;
    return { data };
  }
};

const uninstallPluginControl = async (orgID, memberID, AuthStr) => {
  let setError;

  const config = {
    data: {
      user_id: memberID,
    },
    url: `https://api.zuri.chat/organizations/${orgID}/plugins/${pluginID}`,
    headers: {
      Authorization: AuthStr,
    },
  };
  if (!orgID) {
    setError = 'Organization id is required';
    throw new AppError(setError, 400);
  }

  if (!memberID) {
    setError = 'Member Id is required';
    throw new AppError(setError, 400);
  }
  try {
    const { headers, data } = config;
    const uninstallPlugin = await axios.delete(config.url, { headers, data });
    const { data: response } = uninstallPlugin;
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { installPluginControl, uninstallPluginControl, verifyTokenAndVerifyMemberID };

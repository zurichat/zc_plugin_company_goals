const axios = require('axios');
const {
  payload: { plugin_id: pluginID },
} = require('../utils/config').DATABASE;

const installPluginControl = async (orgID, memberID, AuthStr) => {
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
  const config = {
    data: {
      user_id: memberID,
    },
    url: `https://api.zuri.chat/organizations/${orgID}/plugins/${pluginID}`,
    headers: {
      Authorization: AuthStr,
    },
  };

  try {
    const { headers, data } = config;
    const uninstallPlugin = await axios.delete(config.url, { headers, data });
    const { data: response } = uninstallPlugin;
    return response;
  } catch (error) {
    if (error.isAxiosError) {
      return error.response.data;
    }
    return error;
  }
};

module.exports = { installPluginControl, uninstallPluginControl };

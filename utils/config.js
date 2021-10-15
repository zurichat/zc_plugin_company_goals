/* eslint-disable camelcase */
const { pluginInfo } = require('../data/pluginInfo.json');

const { id: plugin_id } = pluginInfo;

module.exports = {
  DATABASE: {
    URL: 'https://api.zuri.chat/data', // https://zccore.herokuapp.com/data',
    payload: {
      plugin_id,
      organization_id: '1',
      collection_name: '',
      bulk_write: false,
      bulk_delete: false,
      object_id: null,
      filter: {},
      payload: {},
    },
  },
  PLUGIN_ID: '61694e079ea5d3be97df295e',
};

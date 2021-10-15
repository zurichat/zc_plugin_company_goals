/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const axios = require('axios');
const { pluginInfo } = require('../data/pluginInfo.json');
const { find, insertOne, updateOne } = require('../db/databaseHelper');
const logger = require('../utils/logger.js');

const { id: plugin_id } = pluginInfo;

const databaseSyncUrl = `https://api.zuri.chat/plugins/${plugin_id}/sync`;
const pluginInfoUrl = `https://api.zuri.chat/marketplace/plugins/${plugin_id}`;
const goalsOrgId = '616978c8835b35ce2f5a2246';

exports.sync = async (req, res) => {
  try {
    const {
      data: { data: pluginObject },
    } = await axios.get(`${pluginInfoUrl}`);
    const userList = pluginObject.queue;

    if (!userList || userList === null || userList.length < 1) {
      logger.info(`Error 404: No queue to update.`);
      return `No si`;
    }

    const queueId = userList[userList.length - 1].id;

    for (let i = 0; i < userList.length; i += 1) {
      const { organization_id, member_id } = userList[i].message;

      const findOrgs = await find('org_ids', { organization_id }, goalsOrgId);
      const { data } = findOrgs.data;

      if (userList[i].event === 'enter_organization') {
        if (!data || data === null || data.length < 1) {
          await insertOne('org_ids', { organization_id, member_ids: [member_id] }, goalsOrgId);
        } else {
          const newMemberIds = data[0].member_ids;

          if (!newMemberIds.includes(member_id)) newMemberIds.push(member_id);
          await updateOne('org_ids', { member_ids: newMemberIds }, { organization_id }, goalsOrgId);
        }
      } else if (userList[i].event === 'leave_organization') {
        if (data.length > 0) {
          const { member_ids } = data[0];

          if (member_ids.includes(member_id)) {
            const newMemberIds = member_ids.filter((item) => {
              return item !== member_id;
            });

            await updateOne('org_ids', { member_ids: newMemberIds }, { organization_id }, goalsOrgId);
          } else {
            logger.info(`User no longer in organisation`);
          }
        } else {
          logger.info(`Organisation not found`);
        }
      }
    }

    await axios.patch(`${databaseSyncUrl}`, { id: queueId });

    logger.info(`Plug-in updated successfully.`);
    return `siuuuuuuu`;
  } catch (error) {
    logger.info(`Error 500: Something unexpected happened, ${error.message}`);
    return `incorrect sui`;
  }
};

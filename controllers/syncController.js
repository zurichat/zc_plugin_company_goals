/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const axios = require('axios');
const { find, insertOne, updateOne } = require('../db/databaseHelper');
const AppError = require('../utils/appError');
const logger = require('../utils/logger.js');

const databaseSyncUrl = 'https://api.zuri.chat/plugins/613dcd7ae4010959c8dc0c56/sync';
const pluginInfoUrl = 'https://api.zuri.chat/marketplace/plugins/613dcd7ae4010959c8dc0c56';

exports.sync = async (req, res) => {
  try {
    const { data: pluginObject } = await axios.get(`${pluginInfoUrl}`);
    const userList = pluginObject.queue;

    if (!userList) throw new AppError('No queue to update.', 404);

    const queueId = userList[userList.length - 1].id;

    for (let i = 0; i < userList.length; i += 1) {
      const { organization_id, member_id } = userList[i].message;

      if (userList[i].event === 'enter_organization') {
        const {
          data: { data },
        } = await find('org_ids', { organization_id }, 'companyGoalsPlugin');

        if (data === null || data.length < 1) {
          await insertOne('org_ids', { organization_id, member_ids: [member_id] }, 'companyGoalsPlugin');
        } else {
          const newMemberIds = data[0].member_ids;

          if (!newMemberIds.includes(member_id)) newMemberIds.push(member_id);
          await updateOne('org_ids', { member_ids: newMemberIds }, { organization_id }, 'companyGoalsPlugin');
        }
      } else if (userList[i].event === 'leave_organization') {
        const {
          data: { data },
        } = await find('org_ids', { organization_id }, 'companyGoalsPlugin');

        if (data.length > 0) {
          const { member_ids } = data[0];

          if (member_ids.includes(member_id)) {
            const newMemberIds = member_ids.filter((item) => {
              return item !== member_id;
            });

            await updateOne('org_ids', { member_ids: newMemberIds }, { organization_id }, 'companyGoalsPlugin');
          }
        } else {
          logger.info(`User no longer in organisation`);
        }
      }
    }

    const data = await axios.patch(`${databaseSyncUrl}`, { id: queueId });

    return res.status(200).json({
      message: 'Synchronised successfully',
      data,
      isSync: true,
    });
  } catch (error) {
    throw new AppError(`sync operation failed: ${error}`, 500);
  }
};

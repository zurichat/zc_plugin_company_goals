/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const axios = require('axios');
const { find, insertOne, updateOne } = require('../db/databaseHelper');
const AppError = require('../utils/appError');
const logger = require('../utils/logger.js');

const databaseSyncUrl = 'https://api.zuri.chat/plugins/613dcd7ae4010959c8dc0c56/sync';
const pluginInfoUrl = 'https://api.zuri.chat/marketplace/plugins/613dcd7ae4010959c8dc0c56';
const goalsOrgId = '61689c3ddccf86581850a817';

exports.sync = async (req, res) => {
  try {
    const {
      data: { data: pluginObject },
    } = await axios.get(`${pluginInfoUrl}`);
    const userList = pluginObject.queue;

    if (!userList || userList === null || userList.length < 1) {
      logger.info(`Error 404: No queue to update.`);
    }

    const queueId = userList[userList.length - 1].id;

    for (let i = 0; i < userList.length; i += 1) {
      const { organization_id, member_id } = userList[i].message;

      const findOrgs = await find(
        'org_ids',
        {
          organization_id,
        },
        goalsOrgId
      );
      const { data } = findOrgs.data;

      if (userList[i].event === 'enter_organization') {
        if (!data || data === null || data.length < 1) {
          await insertOne(
            'org_ids',
            {
              organization_id,
              member_ids: [member_id],
            },
            goalsOrgId
          );
        } else {
          const newMemberIds = data[0].member_ids;

          if (!newMemberIds.includes(member_id)) newMemberIds.push(member_id);
          await updateOne(
            'org_ids',
            {
              member_ids: newMemberIds,
            },
            {
              organization_id,
            },
            goalsOrgId
          );
        }
      } else if (userList[i].event === 'leave_organization') {
        if (data.length > 0) {
          const { member_ids } = data[0];

          if (member_ids.includes(member_id)) {
            const newMemberIds = member_ids.filter((item) => {
              return item !== member_id;
            });

            await updateOne(
              'org_ids',
              {
                member_ids: newMemberIds,
              },
              {
                organization_id,
              },
              goalsOrgId
            );
          }
        } else {
          logger.info(`User no longer in organisation`);
        }
      }
    }

    await axios.patch(`${databaseSyncUrl}`, {
      id: queueId,
    });

    logger.info(`Plug-in updated successfully.`);
  } catch (error) {
    logger.info(`Error 500: Something unexpected happened, ${error.message}`);
  }
};

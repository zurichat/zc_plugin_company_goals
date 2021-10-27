/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const axios = require('axios');
const { pluginInfo } = require('../data/pluginInfo.json');
const { find, insertOne, deleteOne } = require('../db/databaseHelper');
const logger = require('../utils/logger.js');

const { id: plugin_id } = pluginInfo;

const databaseSyncUrl = `https://api.zuri.chat/plugins/${plugin_id}/sync`;
const pluginInfoUrl = `https://api.zuri.chat/marketplace/plugins/${plugin_id}`;

exports.sync = async (req, res) => {
  try {
    const {
      data: {
        data: { queue: userList },
      },
    } = await axios.get(`${pluginInfoUrl}`);

    if (!userList || userList === null || userList.length < 1) {
      logger.info(`Error 404: No queue to update.`);
      return `No si`;
    }

    const queueId = userList[userList.length - 1].id;

    for (let i = 0; i < userList.length; i += 1) {
      const { organization_id, member_id } = userList[i].message;

      const {
        data: { data },
      } = await find(
        'roomusers',
        {
          room_id: organization_id,
          member_id,
        },
        organization_id
      );

      if (userList[i].event === 'enter_organization') {
        if (!data || data === null || data.length < 1) {
          await insertOne(
            'roomusers',
            {
              room_id: organization_id,
              member_id,
              starred: false,
            },
            organization_id
          );
        }
      } else if (userList[i].event === 'leave_organization') {
        if (data.length > 0) {
          const { _id } = data[0];
          await deleteOne('roomusers', organization_id, _id);
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

exports.syncReq = async (req, res) => {
  try {
    const {
      data: {
        data: { queue: userList },
      },
    } = await axios.get(`${pluginInfoUrl}`);

    if (!userList || userList === null || userList.length < 1) {
      logger.info(`Error 404: No queue to update.`);
      return res.status(404).json({ message: `No queue to update.` });
    }

    const queueId = userList[userList.length - 1].id;

    for (let i = 0; i < userList.length; i += 1) {
      const { organization_id, member_id } = userList[i].message;

      const findOrgs = await find(
        'roomusers',
        {
          room_id: organization_id,
          member_id,
        },
        organization_id
      );
      const { data } = findOrgs.data;

      if (userList[i].event === 'enter_organization') {
        if (!data || data === null || data.length < 1) {
          await insertOne(
            'roomusers',
            {
              room_id: organization_id,
              member_id,
              starred: false,
            },
            organization_id
          );
        }
      } else if (userList[i].event === 'leave_organization') {
        if (data.length > 0) {
          const { _id } = data[0];
          await deleteOne('roomusers', organization_id, _id);
        }
      }
    }
    await axios.patch(`${databaseSyncUrl}`, { id: queueId });
    logger.info(`Plug-in updated successfully.`);
    return res.status(200).json({ message: `Plugin updated successfully.` });
  } catch (error) {
    logger.info(`Error 500: Something unexpected happened, ${error.message}`);
    return res.status(500).json({ message: `Something unexpected occurred` });
  }
};

exports.syncLists = async (tokenHeader, organization_id) => {
  try {
    const {
      data: { data: zccore },
    } = await axios({
      method: 'get',
      url: `https://api.zuri.chat/organizations/${organization_id}/members`,
      headers: { Authorization: tokenHeader },
    });

    const zccore_member_ids = zccore.map((member) => {
      return member._id;
    });

    const {
      data: { data: zcgoals },
    } = await find(
      'roomusers',
      {
        room_id: organization_id,
      },
      organization_id
    );

    const local_member_ids = zcgoals.map((roomuser) => {
      return roomuser.member_id;
    });

    for (const member_id of zccore_member_ids) {
      if (!local_member_ids.includes(member_id)) {
        await insertOne(
          'roomusers',
          {
            room_id: organization_id,
            member_id,
            starred: false,
          },
          organization_id
        );
      }
    }

    for (const member_id of local_member_ids) {
      if (!zccore_member_ids.includes(member_id)) {
        const {
          data: { data: roomuser },
        } = await find(
          'roomusers',
          {
            room_id: organization_id,
            member_id,
          },
          organization_id
        );
        const { _id } = roomuser[0];
        await deleteOne('roomusers', organization_id, _id);
      }
    }
    logger.info(`Local list updated successfully.`);
    return `Local list updated successfully.`;
  } catch (error) {
    logger.info(`The get operation failed with the following error messages: ${error}`);
  }
};

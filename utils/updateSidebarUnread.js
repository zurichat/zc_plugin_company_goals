/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { publish } = require('../controllers/centrifugoController');
const { advancedRead } = require('../db/databaseHelper');
const logger = require('./logger');

module.exports = async (memberIds, orgId) => {
  for (const id of memberIds) {
    let unreadCount;
    try {
      // get the number of unread notifications for the user
      const unread = await advancedRead('goalNotifications', { isRead: false, user_id: id, org_id: orgId }, orgId);
      unreadCount = unread.data.data.length;
    } catch (error) {
      unreadCount = 0;
    }

    const starred = [];

    // check if a room already exists for this user in the organization. If not, add one

    try {
      const response = await advancedRead('roomusers', { member_id: id, room_id: orgId }, orgId, 1, 1);
      const userRoom = response.data.data;

      // check if useRoom is not null and if it has the right value
      if (userRoom && userRoom.length > 0) {
        if (userRoom[0].starred) {
          starred.push({
            room_name: 'All Goals',
            room_image: 'cdn.cloudflare.com/445345453345/hello.jpeg',
            room_url: `/goals/room/${orgId}`,
            room_id: orgId,
            unread: unreadCount,
          });
        }
      }
    } catch (error) {
      logger.error(`no rooms found for member ${id} in organization ${orgId}`);
    }

    // update the sidebar with this information
    await publish(`${orgId}_${id}_sidebar`, {
      event: 'sidebar_update',
      plugin_id: 'goals.zuri.chat',
      data: {
        name: 'Company Goals Plugin',
        description: 'Shows company goals items',
        group_name: 'Goals',
        category: 'productivity',
        show_group: false,
        public_rooms: [],
        starred,
        joined_rooms: [
          {
            room_name: 'All Goals',
            room_image: 'cdn.cloudflare.com/445345453345/hello.jpeg',
            room_url: `/goals/room/${orgId}`,
            room_id: orgId,
            unread: unreadCount,
          },
        ],
      },
    });
  }
};

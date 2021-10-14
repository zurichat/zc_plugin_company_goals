const axios = require('axios');
const { advancedRead } = require('../db/databaseHelper');
const { publish } = require('../controllers/centrifugoController');

module.exports = async (memberIds) => {
  for (const id of memberIds) {
    let unreadCount;
    try {
      // get the number of unread notifications for the user
      const unread = await advancedRead('goalNotifications', { isRead: false, user_id: id, org_id: orgId }, orgId);
      unreadCount = unread.data.data.length;
    } catch (error) {
      unreadCount = 0;
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
        joined_rooms: [
          {
            room_name: 'All Goals',
            room_image: 'cdn.cloudflare.com/445345453345/hello.jpeg',
            room_url: `/goals/room/${orgId}`,
            unread: unreadCount,
          },
        ],
      },
    });
  }
};

const { uuid } = require('uuidv4');


const sidebarOptions = {
    name : "Todo Plugin",
    description : "Shows todo items",
    plugin_id : "61330fcfbfba0a42d7f38e59",
    organisation_id : "1",
    user_id : "1234",
    group_name : "Goals",
    show_group : false,
    
    joined_rooms: [
      {
        title: "general",
        id: uuid(),
        unread: 2,
        members: 23,
        icon : "shovel",
        action : "open"
      },
      {
        title: "announcements",
        id: uuid(),
        unread: 0,
        badge_type: "info",
        members: 132,
        parent_id: "DFGHH-EDDDDS-DFDDF",
        icon : "spear",
        action : "open"
      }
    ],
    public_rooms: [
      {
        title: "jokes",
        id: uuid(),
        unread: 342,
        members: 32,
        icon : "cdn.cloudflare.com/445345453345/hello.jpeg",
        action : "open"
      }
    ]
  }

  module.exports = sidebarOptions;
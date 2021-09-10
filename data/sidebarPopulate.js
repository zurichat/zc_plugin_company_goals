const { uuid } = require('uuidv4');


const sidebarOptions = {
    name : 'Company Goals Plugin',
    description : 'Shows company goals items',
    plugin_id : '61330fcfbfba0a42d7f38e59',
    organisation_id : '1',
    user_id : '1234',
    group_name : 'Goals',
    show_group : false,
    
    joined_rooms: [
      {
        title: 'quarterly',
        id: uuid(),
        unread: 2,
        members: 23,
        icon : 'shovel',
        action : 'open'
      },
      {
        title: 'annually',
        id: uuid(),
        unread: 0,
        badge_type: 'info',
        members: 132,
        parent_id: 'DFGHH-EDDDDS-DFDDF',
        icon : 'spear',
        action : 'open'
      }
    ],
    public_rooms: [
      {
        title: 'general',
        id: uuid(),
        unread: 342,
        members: 32,
        icon : 'cdn.cloudflare.com/445345453345/hello.jpeg',
        action : 'open'
      }
    ]
  }

  module.exports = sidebarOptions;

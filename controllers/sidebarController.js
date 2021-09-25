/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const { find, findAll } = require('../db/databaseHelper');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger')

// exports.readSidebar = catchAsync(async (req, res, next) => {
//   const { user: user_id, org: organization_id } = req.query;

//   const joined_rooms = [];
//   const public_rooms = [];
//   const defaultOption = {
//     title: 'All goals',
//     icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
//     action: 'open',
//   };

//   if (!user_id || !organization_id)
//     return res.status(400).send({ error: 'sidebar query is missing the correct parameters' });



//   // find all room users in an organization to get members
//   let findRoomUsers
//   let roomUsersArr
//   try {
//     // if the collection doesn't exist yet
//     findRoomUsers = await findAll('roomusers', organization_id);
//     const { data } = findRoomUsers.data;
//     roomUsersArr = data
//   } catch (error) {
//     // collection is empty or any other error
//     roomUsersArr = []
//     logger.error(error)
//   }
  

//     // find rooms the user is in
//   let findUserRooms
//   let getUserRooms

//   try {
//     findUserRooms = await find('roomusers', { user_id });
//     const { data } = findUserRooms.data;
//     getUserRooms = data
//   } catch (error) {
//     // collection does not exist
//     getUserRooms = []
//     logger.error(error)
//   }
 
//   console.log('step three');
  

//   if (getUserRooms.length < 1) {
//     return res.status(404).send({ message: `User ${user_id} has not joined any room` });
//   }

//   // add a hasmap to map rooms to their member numbers
//   const roomMemberMap = new Map()

//   for(const roomuser of roomUsersArr)
//   {
//     if(!roomMemberMap.has(roomuser.room_id))
//     {
//       roomMemberMap[roomuser.room_id] = 0
//     }

//     roomMemberMap[roomuser.room_id]++
//   }

  
//   // get all rooms the user has joined

//   for (let room of getUserRooms)
//   {
//     joined_rooms.push({
//       title:room.title,
//       id:room.room_id,
//       unread: 0,
//       members: roomMemberMap[room.room_id],
//       icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
//       action: 'open',
//     })
//   }
//   // console.log('step four');
//   // getUserRooms.map((room) => {
//   //   const members = roomUsersArr.filter((el) => el.room_id === room.room_id).length;
//   //   return joined_rooms.push({
//   //     title: room.title,
//   //     id: room.room_id,
//   //     unread: 0,
//   //     members,
//   //     icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
//   //     action: 'open',
//   //   });
//   // });


//   // get all rooms in the organization 
//   let getAllRooms
//   let allRooms
//   try {
//     getAllRooms = await findAll('goals', organization_id);
//     const { data } = getAllRooms.data;
//     allRooms = data
//   } catch (error) {
//      // collection doesnt exist yet and hence the error
//     allRooms = []
//   }

//   // get all public rooms

//   for(const room of allRooms)
//   {
//     public_rooms.push({
//       title: room.goal_name,
//       id: room.room_id,
//       unread: 0,
//       members: roomMemberMap[room.room_id],
//       icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
//       action: 'open',
//     })
//   }
 

//   // allRooms.map((room) => {
//   //   const members = roomUsersArr.filter((el) => el.room_id === room.room_id).length;
//   //   if (room.access === `zuri's workspace`) {
//   //     public_rooms.push({
//   //       title: room.goal_name,
//   //       id: room.room_id,
//   //       unread: 0,
//   //       members,
//   //       icon: 'cdn.cloudflare.com/445345453345/hello.jpeg',
//   //       action: 'open',
//   //     });
//   //   }
//   //   return public_rooms;
//   // });

//   const response = {
    // name: 'Company Goals Plugin',
    // description: 'Shows company goals items',
    // plugin_id: '613dcd7ae4010959c8dc0c56',
    // organisation_id: '6145d099285e4a184020742e',
    // user_id,
    // group_name: 'Goals',
    // show_group: false,
    // general_room: defaultOption,
//     joined_rooms,
//     public_rooms,
//   };

//   return res.status(200).json(response);
// });


exports.getSidebar = catchAsync(async(req,res,next)=>{
  const { user: user_id, org: organization_id } = req.query;

  if(!organization_id)
  {
    return next(new AppError('organization id is required', 400))
  }

  // get number of users in the organization
  // number of users in the organization == number of people in the room
  // I'll need token for this. Will do that when I figure it out.


  const sidebarJson = {
    name: 'Company Goals Plugin',
    description: 'Shows company goals items',
    plugin_id: '613dcd7ae4010959c8dc0c56',
    organization_id,
    user_id,
    group_name: 'Goals',
    show_group: false,
    public_rooms:[],
    joined_rooms :[
      {
        room_name:'All Goals',
        room_image: 'cdn.cloudflare.com/445345453345/hello.jpeg',
        room_url: `/goals/rooms/${organization_id}`
      }
    ]
  }
  return res.status(200).json(sidebarJson)
});
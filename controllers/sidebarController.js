const sidebarOptions = require('../data/sidebarPopulate');
const catchAsync = require('../utils/catchAsync');
const {findAll, find} = require('../db/databaseHelper')
const AppError = require('../utils/appError')


const readSidebar = catchAsync(async (req, res, next) => {
  if (req.query.org == sidebarOptions.organisation_id && req.query.user == sidebarOptions.user_id && req.query.token == sidebarOptions.plugin_id){
    return res.status(200).json(sidebarOptions);
  }else{
    return res.status(403).send({ message: 'error', data: "bad request"});
  }
});


const getSideBar  = catchAsync(async (req,res,next)=>{
    const {user,org} = req.query

    const user_id = user;
    const organization_id = org


    //get all rooms the user is in
    let allRooms = await find('roomusers',{user_id})
    allRooms = allRooms.data.data
    const joined_rooms = []

    for(const roomuser of allRooms)
    {
      let room = await find('rooms',{id:roomuser.room_id})
      room = room.data.data[0]

      let noUsers = await find('roomusers',{room_id:room.id})
      noUsers = noUsers.data.data.length

      const data = {
        title:room.title,
        id:room.id,
        unread:2,
        members:noUsers,
        icon:'shovel',
        action:'open'
      }
      joined_rooms.push(data)
    }

    const response = {
      name : "Company Goals Plugin",
      description : "Shows company goals items",
      plugin_id : "61330fcfbfba0a42d7f38e59",
      organisation_id : organization_id,
      user_id : user_id,
      group_name : "Goals",
      show_group : false,

      joined_rooms
    }

    res.status(200).json(response)
})

module.exports = getSideBar;

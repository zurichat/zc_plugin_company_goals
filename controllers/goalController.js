/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { find, findAll, findById, insertOne, insertMany, deleteOne, updateOne } = require('../db/databaseHelper');
const {goalsSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllGoals = catchAsync(async (req, res, next) => {
  const { org_id: orgId } = req.query;

  if (!orgId) {
    return res.status(400).send({error: 'org_id is required'})
  }
  // Search for all Goals
  const goals = await findAll('goals', orgId);

  // Returning Response
  res.status(200).json({ status: 200, message: 'success', data: goals.data.data })
});



  // const goals = await axios.post(`https://test-zuri-core.herokuapp.com/crud/goals/insert-one`, req.body);
  // /* const goals = await axios.post(`https://zccore.herokuapp.com/data/write`, {
  //   plugin_id: 'xxx',
  //   organization_id: 'xxx',
  //   collection_name: 'goals',
  //   bulk_write: false,
  //   payload: req.body,
  // }); */
  // //console.log(goals);
  // // Sending Responses
  // res.status(200).json({ status: 'success', data: { id: goals.data.insertedId, ...data } });

// exports.createGoal = catchAsync(async (req, res, next) => {

//   const roomId = uuidv4();
//   const { org_id: orgId } = req.query;
//   const { goal_name: title} = req.body;
//   const goal = req.body;
//   let goals;
  
//    const data = {
//       room_id: roomId,
//       organization_id: orgId,
//       ...goal,
//     };
 
//     if (!orgId) {
//       res.status(400).send({ error: 'Organization_id is required' });
//     }


//     try {
//     const validateGoal = await goalsSchema.validateAsync(req.body);
//     } catch (err) {
//     if(err) return res.status(400).json(err.details);
//     }

//     try {
//        goals = await find('goals', { goal_name: title }, orgId);
//        const { data: foundGoal } = goals.data;
//        if (foundGoal.length > 0) {
//          return res.status(400).send({ error: `Goal with the title: ${title} already exists` });
//        }
//     } catch (error) {
//       goals = await insertOne('goals', data, orgId);
//     }

//   } catch (err) {
//     if (err) {
//       return res.status(400).json({error: err.details });
//     } 
//   }
//     res.status(200).json({ message: 'success', ...goals.data, data });
// });





exports.getSingleGoal = catchAsync(async (req, res, next) => {
  let users;
  const { room_id: id, org_id: org } = req.query;
  const goal = await find('goals', { room_id: id }, org);


  try {
    
    users = await find('roomusers', { room_id: id }, org_id);

    const { data: getUsers } = findUsers.data;
    
    const result = getUsers.map((user) => {
      return user.user_id
    })
    
    const data = {
      goal: goal.data.data,
      users: result
    }
    res.status(200).json({ status: 200, message: 'success', data });
  } catch (err) {
    users = 'No user has been assigned to this goal';
    const data = {
      goal: goal.data.data,
      users,
    };
    res.status(200).json({ status: 200, message: 'success', data});
}
  next(new AppError({ message: 'invalid request' }, {statusCode: 400}));
});




exports.updateSingleGoalById = catchAsync(async (req, res, next) => {
  // First, Get the goalId from req.params
  const goalId = req.params.id;
  
  // Then, send update to zuri core
  const updatedGoal = await updateOne(collectionName='goals', data=req.body, filter={}, id=goalId)


  // send the updated goal to client.
  return res.status(200).json(updatedGoal.data);
});

exports.getArchivedGoals = catchAsync(async (req, res, next) => {

  // Gets archived goals
  const goals = await find('goals', {achieved: false});

  // Condition if there are no archivedd goals
  if (goals.data.data.length < 1) {
    goals.data.data = 'No archived goals yet.'
  }

  // Return Response
  res.status(200).json({ status: 200, message: 'success', data: goals.data.data });
});

exports.deleteGoal = catchAsync(async (req, res, next) => {
  // First, Get the goalId from req.params
  const goalId = req.query;
  
  // Then, delete the goal.
  await deleteOne(collectionName='goals', data=req.body, filter={}, id=goalId)


  // Then send a response message back to the client.
  return res.status(200).json('Goal deleted successfully.');
});

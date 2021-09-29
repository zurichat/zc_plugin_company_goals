const { v4: uuidv4 } = require('uuid');
const {
  find,
  findAll,
  findById,
  insertOne,
  insertMany,
  deleteOne,
  updateOne,
  deleteMany,
} = require('../db/databaseHelper');
const { goalSchema, likeGoalSchema, getGoalLikesSchema, targetSchema } = require('../schemas');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

exports.getChartInfo = async (req, res, next) => {
    const {org_id: orgId} = req.query;
    
    if (!orgId) {
        logger.info(`Can't get goals for null organisation id... Exiting...`);
        return res.status(400).send({ error: 'org_id is required' });
    }

    try{
        const goalsData = await findAll('goals', orgId);
        
        const allGoals = goalsData.data.data;
       // console.log(allGoals);
        let result = {totalGoals:allGoals.length}
        const {totalGoals, isComplete, isExpired, InProgress} = result;
        console.log(totalGoals);
       allGoals.forEach((goal)=>{
        
            if(!goal.isComplete){
                if(result['isInComplete'] >= 0){
                    result['isInComplete']++
                }
                else{
                    result['isInComplete'] = 0
                }
              //  result['isInCompleted'] = 0
            }





            if(!goal.isExpired){
                if(result['isNotExpired'] >= 0){
                    result['isNotExpired']++
                }
                else{
                    result['isNotExpired'] = 0
                }
                result['isExpired'] = totalGoals - result['isNotExpired']
            } 

            // && goal.due_date > Date.toString()
            if(goal.start_date){
               // console.log(, 'today')
                if(result['inProgress'] >= 0){
                    result['inProgress']++
                }
                else{
                    result['inProgress'] = 0
                }
                //result['inProgress'] = 0
            } 


        })

        res.json(result);
    }

    catch(error){
        console.log(error);
        res.send(error.message)
    }

    

}


















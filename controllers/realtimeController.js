const {findAll } = require('../db/databaseHelper');
const AppError = require('../utils/appError');

exports.getUpdates=async (req,res,next)=>{
    const {orgId}=req.params
    if(!orgId){
        return next(new AppError({ message: 'invalid request' }, {statusCode: 400}));
    }
    try {
        const updates=await findAll('goalEvents',orgId);
        res.status(200).json({ message: 'success', updates:updates.data});
    } catch (error) {
        next(new AppError({ message: 'invalid request' }, {statusCode: 400}));
    }
}
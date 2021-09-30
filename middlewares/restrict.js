
const restrict = (req, res, next) => {
    const { designation } = req;
    if (designation && designation.toLowerCase().trim() === 'owner') {
        next();
    } else {
        res.status(403).json({status: 'failed', message: 'forbidden'})
    }
}


module.exports = restrict

const { readFile } = require('fs').promises;

exports.statusTimerReport = async (req, res, next) => {
  try {
    const file = await readFile('./logs/statusCodesReport.txt', 'utf-8');
    // const fileArray = file.split('>');
    // fileArray.forEach(report => {

    // });
    next();
    return res.send(file);
  } catch (error) {
    next();
    return res.status(500).json({ message: 'Server Error, Try again' });
  }
};

const { getFiles } = require('../utils/Directory');

module.exports.searchFile = async (req, res) => {
  const { channelName, fileName } = req.query;

  try {
    const folderPath = `./uploads/${channelName}`;
    const data = await getFiles(folderPath, fileName);

    if (data.length) {
      return res.status(200).json({ message: 'Found', data: data });
    }

    return res.status(404).json({ message: 'Not Found', data: null });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', data: null });
  }
};

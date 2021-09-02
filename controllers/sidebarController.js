const sidebarOptions = require('../data/sidebarData.json');

const readSidebar = (req, res) => {
  return res.status(200).json(sidebarOptions);
};

module.exports = readSidebar;

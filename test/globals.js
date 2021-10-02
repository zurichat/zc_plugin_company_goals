const data = () => {
  const orgID = '6145d099285e4a184020742e';
  return {
    orgID,
    visionRead: `https://api.zuri.chat/data/read/613dcd7ae4010959c8dc0c56/vision/${orgID}?organization_id=${orgID}`,
  };
};

module.exports = data();

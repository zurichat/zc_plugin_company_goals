const defaultOrg = '6145d099285e4a184020742e';

const urls = (orgID = defaultOrg) => {
  return {
    visionRead: `https://api.zuri.chat/data/read/613dcd7ae4010959c8dc0c56/vision/${orgID}?organization_id=${orgID}`,
    missionRead: `https://api.zuri.chat/data/read/613dcd7ae4010959c8dc0c56/mission/${orgID}`,
  };
};

module.exports = { urls, defaultOrg };

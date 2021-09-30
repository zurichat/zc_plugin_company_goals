const axios = require('axios');

const auth = async (req, res, next) => {
  const URL = `https://api.zuri.chat/auth/verify-token`;
  const URL_ORG = `https://api.zuri.chat/organizations`;

  if (req) {
    const authorization = req.header('Authorization');

    if (authorization) {
      const [Bearer, token, organizationId] = authorization.split(' ');
      const AuthStr = Bearer.concat(` ${token}`);

      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization': AuthStr,
          },
        });
        const {
          data: { user },
        } = response.data;

        if (user && user.email) {
          const {
            data: { data },
          } = await axios.get(`${URL_ORG}/${organizationId}/members`, {
            params: {
              query: user.email,
            },
            headers: {
              Authorization: AuthStr,
            },
          });
          req.designation = data[0].role;
          next();
        } else {
          return res.status(401).json({ status: 'failed', message: 'Token is incorrect' });
        }
      } catch (error) {
        return res.status(401).json({ status: 'failed', message: 'No Authorization or session expired' });
      }
    } else {
      return res.status(401).json({ status: 'failed', message: 'No authorization is set' });
    }
  }
};

module.exports = auth;

const axios = require('axios');


const auth = async (req, res, next) => {
    const URL = `https://api.zuri.chat/auth/verify-token`;
    
    if (req) {
        const authorization = req.header('Authorization');
        const cookie = req.header('Cookie');
        const role = req.header('User-Role');

        if (authorization) {
            const token = authorization.replace('Bearer ', '');
            const AuthStr = 'Bearer '.concat(token);
           
            try {
            const response = await axios.get(URL, {
                headers: {
                    'Authorization': AuthStr
                }
            });
                const { data: user } = response.data;

            if (user && role) {
              req.designation = role;
              next();
            } else {
              return res.status(401).json({ status: 'failed', message: 'Token is incorrect or missing header field(s)' });
            }
    
            } catch (error) {
           return res.status(401).json({ status: 'failed', message: 'No Authorization or session expired' });
         }
        } else if (cookie) {
            try {
                const response = await axios.get(URL, {
                    headers: {
                        'Cookie': cookie
                    }
                });
                
                  const { data: user } = response.data;
                  if (user && role) {
                    req.designation = role;
                    next();
                  } else {
                    return res.status(401).json({ status: 'failed', message: 'Cookie is incorrect or missing header field(s)' });
                  }
            } catch (error) {
                res.status(400).send({ status: 'failed', message: 'No Authorization or session expired' });
            }
        } else {
            return res.status(401).json({ status: 'failed', message: 'No authorization is set' });
        }
      
    }
}


module.exports = auth;
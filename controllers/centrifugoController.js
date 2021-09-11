const axios = require('axios');
const { SOCKET_KEY, SOCKET_URL } = require('../centrifugo_config/index');
const CustomError = require('../utils/appError');


const publish=async (channel, data)=> {
    try {
      await axios.post(
        SOCKET_URL,
        {
          method: 'publish',
          params: {
            channel,
            data,
          },
        },
        {
          headers: {
            Authorization: `apikey ${SOCKET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return true;
    } catch (error) {
      throw new CustomError(`Unable to publish to ${channel}: ${error}`, '500');
    }
  }


const test = (req, res) => {
  try {
    publish('test', 'this is a test');
    res.send('check front end');
  } catch (error) {
    res.send('error')
  }

};

module.exports = test;

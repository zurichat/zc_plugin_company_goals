import axios from 'axios';

export function getVision() {
  return axios
    .get('goals.zuri.chat/api/v1/vision/61433d7ad0284bc6a92233bb')
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

import { parse, isDate } from 'date-fns';
import axios from 'axios';
import { GetUserInfo } from "@zuri/control";
import baseUrl from '../../../utils/util.js';



let createEditGoalBaseRouteUrl = `${baseUrl}/api/v1/goals`;
let createGoalRouteUrl = `${createEditGoalBaseRouteUrl}/?org_id=`;
let editGoalRouteUrl = `${createEditGoalBaseRouteUrl}/update`;



if (process.env.NODE_ENV === 'production') {
  createEditGoalBaseRouteUrl = 'https://goals.zuri.chat/api/v1/goals';
  createGoalRouteUrl = `${createEditGoalBaseRouteUrl}/?org_id=`;
  editGoalRouteUrl = `${createEditGoalBaseRouteUrl}/update`;
}

const goalCreateEditDataApi = {
 
  create: async (createGoalData, orgId) => {
     const getInfo = await GetUserInfo();
     const { token } = getInfo;
    const response = await axios.post(`${createGoalRouteUrl}${orgId}`, createGoalData, {
      headers: {
      'Authorization': `Bearer ${token} ${orgId}`
    }});
    return response;
  },
  edit: async (goalId, editGoalData, orgId) => {
     const getInfo = await GetUserInfo();
     const { token } = getInfo;
    const response = await axios.put(`${editGoalRouteUrl}/${goalId}?org_id=${orgId}`, editGoalData, {
      headers: {
        'Authorization': `Bearer ${token} ${orgId}`
      }
    });
    
    return response;
  },
};

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue) ? originalValue : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
};

export { goalCreateEditDataApi, parseDateString };

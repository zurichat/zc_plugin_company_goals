import { parse, isDate } from 'date-fns';
import axios from 'axios';

let createEditGoalBaseRouteUrl = 'http://localhost:4000/api/v1/goals';
let createGoalRouteUrl = `${createEditGoalBaseRouteUrl}/?org_id=6145d099285e4a184020742e`;
let editGoalRouteUrl = `${createEditGoalBaseRouteUrl}/update`;

if (process.env.NODE_ENV === 'production') {
  createEditGoalBaseRouteUrl = 'https://goals.zuri.chat/api/v1/goals';
  createGoalRouteUrl = `${createEditGoalBaseRouteUrl}/?org_id=6145d099285e4a184020742e`;
  editGoalRouteUrl = `${createEditGoalBaseRouteUrl}/update`;
}

const goalCreateEditDataApi = {
  create: async (createGoalData) => {
    const response = await axios.post(createGoalRouteUrl, createGoalData);
    return response;
  },
  edit: async (goalId, editGoalData) => {
    console.log('id', goalId);
    console.log('data', editGoalData);
    const response = await axios.put(`${editGoalRouteUrl}/${goalId}?org_id=6145d099285e4a184020742e`, editGoalData);
    return response;
  },
};

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue) ? originalValue : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
};

export { goalCreateEditDataApi, parseDateString };

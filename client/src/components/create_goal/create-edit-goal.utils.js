import { parse, isDate } from 'date-fns';
import axios from 'axios';

let createEditGoalRouteUrl = 'http://localhost:4000/api/v1/goals/?org_id=6145d099285e4a184020742e';

if (process.env.NODE_ENV === 'production') {
  createEditGoalRouteUrl = 'https://goals.zuri.chat/api/v1/goals/?org_id=6145d099285e4a184020742e';
}

const goalCreateEditDataApi = {
  create: async (createGoalData) => {
    const response = await axios.post(createEditGoalRouteUrl, createGoalData);
    return response;
  },
};

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue) ? originalValue : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
};

export { goalCreateEditDataApi, parseDateString };

import * as Yup from 'yup';
import { parseDateString } from './create-edit-goal.utils';

const createGoalSchema = Yup.object().shape({
  goal_name: Yup.string()
    .min(10, 'Characters less than 10')
    .max(30, 'Characters greater than 30')
    .trim()
    .required('Goal Name is required'),
  description: Yup.string()
    .min(10, 'Characters less than 10')
    .max(30, 'Characters greater than 30')
    .trim()
    .required('Goal description is required'),
  goal_type: Yup.string().oneOf(['annual', 'quarterly']).required(),
  category: Yup.string().min(3).required(),
  start_date: Yup.date().transform(parseDateString).min(new Date()).required(),
  due_date: Yup.date().transform(parseDateString).min(new Date()).required(),
});

export default createGoalSchema;

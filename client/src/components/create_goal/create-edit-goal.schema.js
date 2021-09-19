import * as Yup from 'yup';
import parseDateString from './create-edit-goal.utils';

const createGoalSchema = Yup.object().shape({
  goal_name: Yup.string()
    .min(10, 'Characters less than 10')
    .max(30, 'Characters greater than 30')
    .trim()
    .required('Goal Name is required'),
  goal_description: Yup.string()
    .min(10, 'Characters less than 10')
    .max(30, 'Characters greater than 30')
    .trim()
    .required('Goal description is required'),
  goal_type: Yup.string().oneOf(['annual_goal', 'quaterly_goal']),
  goal_category: Yup.string().oneOf(['product_design', 'marketing']),
  goal_start_date: Yup.date().transform(parseDateString).min(new Date()).required(),
  goal_due_date: Yup.date().transform(parseDateString).max(new Date()).required(),
});

export default createGoalSchema;

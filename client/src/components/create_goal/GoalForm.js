/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { saveGoal } from '../../redux/newGoalSlice';
import createGoalSchema from './create-edit-goal.schema';
import {
  Goal,
  Form,
  GoalInput,
  Button,
  GoalTitle,
  GoalInfo,
  Container,
  CloseButton,
  CreateButton,
  LabelBody,
  TargetInput,
  TargetContainerA,
  TargetContainerB,
  Select,
  SelectDivA,
  SelectDivB,
  MainTitle,
  Wrap,
  Datalist,
} from './GoalForm.style';
import { goalCreateEditDataApi } from './create-edit-goal.utils';
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
import { activateSnackbar } from '../../redux/snackbar.slice';
import { useSWRConfig } from 'swr';
import { resetGoalFormData } from '../../redux/organizationGoal.slice';

const GoalForm = forwardRef((props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose } = props;
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();
  const { isEditing, goalFormData } = useSelector((state) => state.organizationCreateAndEditGoalData);

  return (
    <Goal>
      <CloseButton type="button" onClick={handleClose}>
        x{' '}
      </CloseButton>{' '}
      <Formik
        validationSchema={createGoalSchema}
        initialValues={goalFormData}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (isEditing.status) {
            try {
              const editedGoal = await goalCreateEditDataApi.edit(isEditing.goalId, values);
              dispatch(resetGoalFormData());
              dispatch(toggleCreateGoalModalAction());
              await mutate('getAllGoals');
              dispatch(activateSnackbar({ content: 'Goal successfully edited 🎊', severity: 'success' }));
              console.log('goal-edit-success', editedGoal);
            } catch (err) {
              setSubmitting(false);
              dispatch(activateSnackbar({ content: 'Failed to edit your goal 😢', severity: 'error' }));
              console.log('goal-edit-failure', err);
            }
          } else {
            try {
              const createdGoal = await goalCreateEditDataApi.create(values);
              dispatch(toggleCreateGoalModalAction());
              await mutate('getAllGoals');
              dispatch(activateSnackbar({ content: 'Goal successfully created 🥳', severity: 'success' }));
              console.log('goal-create-success', createdGoal);
            } catch (err) {
              setSubmitting(false);
              dispatch(activateSnackbar({ content: 'Failed to create your goal 😭', severity: 'error' }));
              console.log('goal-create-failure', err);
            }
          }
        }}
      >
        {({ errors, values, touched, isSubmitting, handleSubmit, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Container>
              {' '}
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="goal-name">
                  <MainTitle> {isEditing.status ? 'Edit Goal' : 'Create Goal'}</MainTitle>
                  <GoalInfo fontSize="13px">
                    Goal setting helps in creating a pathway for achieving your long and short terms mission
                  </GoalInfo>
                </label>{' '}
              </div>{' '}
            </Container>{' '}
            <Container>
              {' '}
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="goal-name">
                  <GoalTitle> Goal Name </GoalTitle>

                  <GoalInput
                    type="text"
                    id="goal-name"
                    name="goal_name"
                    value={values.goal_name}
                    onChange={handleChange}
                  />
                </label>{' '}
                <span>{touched.goal_name && errors.goal_name}</span>
              </div>{' '}
            </Container>{' '}
            <Container>
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="goal-description">
                  <Wrap>
                    <GoalTitle> Goal Description </GoalTitle>
                  </Wrap>{' '}
                  <GoalInput
                    type="text"
                    id="goal-description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </label>
                <span>{touched.description && errors.description}</span>
              </div>{' '}
            </Container>{' '}
            <Container>
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="owner">
                  <Wrap>
                    <GoalTitle> Goal Sort </GoalTitle>{' '}
                    <GoalInfo fontSize="15px"> (Set goal Type and Category and Priority) </GoalInfo>{' '}
                  </Wrap>{' '}
                  <TargetContainerA>
                    <SelectDivA style={{ width: '45% !important' }}>
                      <label htmlFor="goal-type">
                        <Select name="goal_type" id="goal-type" value={values.goal_type} onChange={handleChange}>
                          <option value="">Type</option>
                          <option value="annual">Annual Goal</option>
                          <option value="quarterly"> Quaterly Goal</option>
                        </Select>
                      </label>
                      <span>{touched.goal_type && errors.goal_type}</span>
                    </SelectDivA>
                    <SelectDivB style={{ width: '50% !important' }}>
                      <label htmlFor="goal-category">
                        <Datalist
                          type="text"
                          list="goal-category"
                          name="goal-category"
                          placeholder="Category"
                          value={values.category}
                          onChange={handleChange}
                        />
                        <datalist name="category" id="goal-category">
                          <option value="Product Design"></option>
                          <option value=" Marketing"></option>
                        </datalist>
                      </label>
                      <span>{touched.category && errors.category}</span>
                    </SelectDivB>
                  </TargetContainerA>
                </label>
              </div>{' '}
            </Container>{' '}
            <Container>
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="date">
                  <div>
                    <GoalTitle> Goal Timeline </GoalTitle>{' '}
                  </div>{' '}
                  <TargetContainerB>
                    <div style={{ width: '45%', marginRight: '0.5rem' }}>
                      <LabelBody style={{ marginBottom: '0.5rem' }}>Start Date</LabelBody>
                      <TargetInput
                        type="text"
                        id="goal-start-date"
                        name="start_date"
                        onFocus={(e) => {
                          e.currentTarget.type = 'date';
                        }}
                        onChange={handleChange}
                        // eslint-disable-next-line no-return-assign
                        // onBlur={(e) => (e.currentTarget.type = 'text')}
                        placeholder="01/02/2021"
                        value={values.start_date}
                      />
                      <span>{touched.start_date && errors.start_date}</span>
                    </div>
                    <div style={{ width: '50%' }}>
                      <LabelBody style={{ marginBottom: '0.5rem' }}>Due Date</LabelBody>
                      <TargetInput
                        type="text"
                        id="goal-due-date"
                        name="due_date"
                        onFocus={(e) => {
                          e.currentTarget.type = 'date';
                        }}
                        onChange={handleChange}
                        // eslint-disable-next-line no-return-assign
                        // onBlur={(e) => (e.currentTarget.type = 'text')}
                        placeholder="11/02/2021"
                        value={values.due_date}
                      />
                      <span>{touched.due_date && errors.due_date}</span>
                    </div>
                  </TargetContainerB>
                </label>
              </div>{' '}
            </Container>{' '}
            <CreateButton title={isSubmitting ? 'saving...' : ''}>
              <Button type="submit" buttonPadding="1rem 3rem" borderRadius="6px" disabled={isSubmitting}>
                {isEditing.status ? 'Edit Goal' : 'Create Goal'}
              </Button>{' '}
            </CreateButton>{' '}
          </Form>
        )}
      </Formik>
    </Goal>
  );
});

export default GoalForm;

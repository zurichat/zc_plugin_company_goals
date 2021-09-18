/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { saveGoal } from '../../redux/newGoalSlice';
import createGoalSchema from './create-edit-goal.schema';
import {
  Goal,
  Form,
  Input,
  Button,
  Title,
  Info,
  Container,
  CloseButton,
  CreateButton,
  TargetInput,
  TargetContainerA,
  TargetContainerB,
  Select,
  SelectDiv,
  MainTitle,
  Wrap,
} from './GoalForm.style';
import { LabelBody } from './RadioInput.style';

const GoalForm = forwardRef((props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose } = props;
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const createAndEditGoalData = useSelector((state) => state.organizationCreateAndEditGoal);

  const onInputChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const onCreateGoal = (e) => {
    e.preventDefault();
    const fieldNames = ['goalName', 'owner', 'goalAccess', 'category', 'description', 'date'];

    const isValid = user !== null && fieldNames.every((v) => user[v]);
    if (isValid) {
      dispatch(saveGoal(user));
      setUser(null);
    } else {
      dispatch(saveGoal('input all fields'));
    }
  };

  return (
    <Goal>
      <CloseButton type="button" onClick={handleClose}>
        x{' '}
      </CloseButton>{' '}
      <Formik
        validationSchema={createGoalSchema}
        initialValues={createAndEditGoalData}
        onSubmit={(values) => {
          console.log('done', values);
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
                  <MainTitle> Create Goal </MainTitle>
                  <Info fontSize="13px">
                    Goal setting helps in creating a pathway for achieving your long and short terms mission
                  </Info>
                </label>{' '}
              </div>{' '}
            </Container>{' '}
            <Container>
              {' '}
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="goal-name">
                  <Title> Goal Name </Title>

                  <Input type="text" id="goal-name" name="goal_name" value={values.goal_name} onChange={handleChange} />
                </label>{' '}
              </div>{' '}
            </Container>{' '}
            <Container>
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="goal-description">
                  <Wrap>
                    <Title> Goal Description </Title> <Info fontSize="15px"> (Optional) </Info>{' '}
                  </Wrap>{' '}
                  <Input type="text" id="goal-description" name="goal_description" onChange={handleChange} />
                </label>
              </div>{' '}
            </Container>{' '}
            <Container>
              <div style={{ paddingTop: '0.5rem' }}>
                {' '}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
                <label htmlFor="owner">
                  <Wrap>
                    <Title> Goal Sort </Title> <Info fontSize="15px"> (Set goal Type and Category and Priority) </Info>{' '}
                  </Wrap>{' '}
                  <TargetContainerA>
                    <SelectDiv>
                      <label htmlFor="goal-type">
                        <Select name="goal_type" id="goal-type" value={values.goal_type} onChange={handleChange}>
                          <option value="">Type</option>
                          <option value="annual_goal">Annual Goal</option>
                          <option value="quaterly_goal"> Quaterly Goal</option>
                        </Select>
                      </label>
                    </SelectDiv>
                    <SelectDiv>
                      <label htmlFor="goal-category">
                        <Select
                          name="goal_category"
                          id="goal-category"
                          value={values.goal_category}
                          onChange={handleChange}
                        >
                          <option value="">Category</option>
                          <option value="product_design">Product Design</option>
                          <option value="marketing"> Marketing</option>
                        </Select>
                      </label>
                    </SelectDiv>
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
                    <Title> Goal Timeline </Title>{' '}
                  </div>{' '}
                  <TargetContainerB>
                    <div style={{ width: '45%', marginRight: '0.5rem' }}>
                      <LabelBody style={{ marginBottom: '0.5rem' }}>Start Date</LabelBody>
                      <TargetInput
                        type="text"
                        id="goal-start-date"
                        name="goal_start_date"
                        onFocus={(e) => {
                          e.currentTarget.type = 'date';
                        }}
                        onChange={handleChange}
                        // eslint-disable-next-line no-return-assign
                        // onBlur={(e) => (e.currentTarget.type = 'text')}
                        placeholder="01/02/2021"
                        value={values.goal_start_date}
                      />
                      <span>{touched.goal_start_date && errors.goal_start_date}</span>
                    </div>
                    <div style={{ width: '50%' }}>
                      <LabelBody style={{ marginBottom: '0.5rem' }}>Due Date</LabelBody>
                      <TargetInput
                        type="text"
                        id="goal-due-date"
                        name="goal_due_date"
                        onFocus={(e) => {
                          e.currentTarget.type = 'date';
                        }}
                        onChange={handleChange}
                        // eslint-disable-next-line no-return-assign
                        // onBlur={(e) => (e.currentTarget.type = 'text')}
                        placeholder="11/02/2021"
                        value={values.goal_due_date}
                      />
                      <span>{touched.goal_due_date && errors.goal_due_date}</span>
                    </div>
                  </TargetContainerB>
                </label>
              </div>{' '}
            </Container>{' '}
            <CreateButton>
              <Button type="submit" buttonPadding="1rem 3rem" borderRadius="6px" disabled={isSubmitting}>
                Create Goal{' '}
              </Button>{' '}
            </CreateButton>{' '}
          </Form>
        )}
      </Formik>
    </Goal>
  );
});

export default GoalForm;

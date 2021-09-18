/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGoal } from '../../redux/newGoalSlice';
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
      <Form action="">
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

              <Input type="text" id="goalName" onChange={(e) => onInputChange(e)} />
            </label>{' '}
          </div>{' '}
        </Container>{' '}
        <Container>
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="owner">
              <Wrap>
                <Title> Goal Description </Title> <Info fontSize="15px"> (Optional) </Info>{' '}
              </Wrap>{' '}
              <Input type="text" id="owner" onChange={(e) => onInputChange(e)} />
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
                    <Select name="goal-type" id="">
                      <option value="">Type</option>
                      <option value="Annual Goal">Annual Goal</option>
                      <option value="Quaterly Goaal"> Quaterly Goal</option>
                    </Select>
                  </label>
                </SelectDiv>
                <SelectDiv>
                  <label htmlFor="category">
                    <Select name="category" id="">
                      <option value="">Category</option>
                      <option value="Product Design">Product Design</option>
                      <option value="Marketing"> Marketing</option>
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
                    id="date"
                    onFocus={(e) => {
                      e.currentTarget.type = 'date';
                    }}
                    // eslint-disable-next-line no-return-assign
                    onBlur={(e) => (e.currentTarget.type = 'text')}
                    placeholder="01/02/2021"
                  />
                </div>
                <div style={{ width: '50%' }}>
                  <LabelBody style={{ marginBottom: '0.5rem' }}>Due Date</LabelBody>
                  <TargetInput
                    type="text"
                    id="date"
                    onFocus={(e) => {
                      e.currentTarget.type = 'date';
                    }}
                    // eslint-disable-next-line no-return-assign
                    onBlur={(e) => (e.currentTarget.type = 'text')}
                    placeholder="11/02/2021"
                  />
                </div>
              </TargetContainerB>
            </label>
          </div>{' '}
        </Container>{' '}
        <CreateButton>
          <Button type="submit" buttonPadding="1rem 4rem" borderRadius="6px" onClick={(e) => onCreateGoal(e)}>
            Create Goal{' '}
          </Button>{' '}
        </CreateButton>{' '}
      </Form>{' '}
    </Goal>
  );
});

export default GoalForm;

import { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGoal } from '../../redux/newGoalSlice';
import { GoalAcess } from './GoalAccess';
import { GoalFolder } from './GoalFolder';
import {
  Goal,
  Form,
  Input,
  Button,
  Title,
  Info,
  Icon,
  Container,
  CloseButton,
  CreateButton,
  GlobalStyles,
  TargetInput,
  TargetContainerB,
  TargetContainerA,
  PriorityContainer,
  TextArea,
} from './GoalForm.style';
import { GoalMilestone } from './GoalMilestone';
import img from './icon/active.png';
import { PriorityRadio } from './PriorityRadio';
import { LabelBody } from './RadioInput.style';
import { TargetRadio } from './TargetRadio';

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
      <GlobalStyles />
      <CloseButton type="button" onClick={handleClose}>
        x{' '}
      </CloseButton>{' '}
      <Form action="">
        <Container>
          {' '}
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="goal-name">
              <Title titleColor="#393939"> Goal Name </Title>
              <Info textColor="#999999">
                Goals are high level containers that can be broken down into smaller target.Learn more{' '}
              </Info>{' '}
              <Input
                type="text"
                id="goalName"
                onChange={(e) => onInputChange(e)}
                placeholder="Goals are high level containers that can be broken down into"
              />
            </label>{' '}
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="owner">
              <div>
                <Title titleColor="#393939"> Owner </Title>{' '}
                <Info textColor="#999999"> This is optional, who will take responsibility for the goals </Info>{' '}
              </div>{' '}
              <Input type="text" id="owner" placeholder="Mark Essien" onChange={(e) => onInputChange(e)} />
            </label>
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="goal-access">
              <div>
                <Title titleColor="#393939"> Who has access to this goal ? </Title>{' '}
                <div
                  style={{
                    marginTop: '2rem',
                  }}
                >
                  <GoalAcess />{' '}
                </div>{' '}
              </div>{' '}
            </label>
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            <div>
              <Title titleColor="#393939"> Goal Folder (Optional) </Title>{' '}
              <Info textColor="#999999"> This shows if it&apos;s an annual or quarterly goal. </Info>{' '}
            </div>{' '}
            <TargetContainerA>
              <GoalFolder />
            </TargetContainerA>
          </div>
        </Container>
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="date">
              <div>
                <Title titleColor="#393939"> Goal Timeline (Optional) </Title>{' '}
                <Info textColor="#999999"> This is optional. </Info>{' '}
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
                    placeholder="mm/dd/yy"
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
                    placeholder="mm/dd/yy"
                  />
                </div>
              </TargetContainerB>
            </label>
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="owner">
              <div>
                <Title titleColor="#393939">Categories/Tags (Optional)</Title>{' '}
                <Info textColor="#999999">
                  {' '}
                  This is optional. A categorization that will help in sorting from multiples
                </Info>{' '}
              </div>{' '}
              <Input type="text" id="owner" placeholder="#" onChange={(e) => onInputChange(e)} />
            </label>
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="owner">
              <div>
                <Title titleColor="#393939">Description (Optional)</Title>{' '}
                <Info textColor="#999999">
                  {' '}
                  This is optional. A short explanation on why the goal is set and how it can be achieved
                </Info>{' '}
              </div>{' '}
              <TextArea type="text" id="owner" onChange={(e) => onInputChange(e)} rows="3" />
            </label>
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="category">
              <div>
                <Title titleColor="#393939"> Category </Title>{' '}
                <Info textColor="#999999">
                  This is optional.A categorization that will help in sorting from multiples{' '}
                </Info>{' '}
              </div>{' '}
              <Input type="text" id="category" placeholder="Product Design" onChange={(e) => onInputChange(e)} />
            </label>
          </div>{' '}
        </Container>{' '}
        <Container>
          {' '}
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="description">
              <div>
                <Title titleColor="#393939"> Description </Title>{' '}
                <Info textColor="#999999">
                  This is optional.A short explanation on why the goal is set and how it can be achieved{' '}
                </Info>{' '}
              </div>{' '}
              <Input type="text" id="description" onChange={(e) => onInputChange(e)} />
            </label>
          </div>{' '}
        </Container>{' '}
        <Container>
          {' '}
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <div>
              <Title titleColor="#393939"> Target Type </Title>{' '}
              <Info textColor="#999999">
                This is optional.A short explanation on why the goal is set and how it can be achieved{' '}
              </Info>{' '}
            </div>{' '}
            <TargetContainerA>
              <TargetRadio />
            </TargetContainerA>
            <TargetContainerB>
              <div style={{ width: '45%', marginRight: '0.5rem' }}>
                <LabelBody style={{ marginBottom: '0.5rem' }}>Start</LabelBody>
                <TargetInput
                  type="text"
                  name=""
                  id="Start"
                  style={{ marginRight: '0.8rem', paddingLeft: '0.5rem' }}
                  placeholder="0"
                />
              </div>
              <div style={{ width: '50%' }}>
                <LabelBody style={{ marginBottom: '0.5rem' }}>Target</LabelBody>
                <TargetInput type="text" name="" id="Target" placeholder="4" style={{ paddingLeft: '0.5rem' }} />
              </div>
            </TargetContainerB>
          </div>{' '}
        </Container>{' '}
        <Container>
          {' '}
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <div>
              <Title titleColor="#393939">Number of Milestones (Optional)</Title>{' '}
              <Info textColor="#999999">
                This is optional. It is used to break down the goals into achievable targets{' '}
              </Info>{' '}
            </div>{' '}
            <GoalMilestone />
          </div>{' '}
        </Container>{' '}
        <Container>
          {' '}
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="30px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div style={{ paddingTop: '0.5rem' }}>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <Title titleColor="#393939">Set Goal Priority</Title>{' '}
            <PriorityContainer>
              <PriorityRadio />
            </PriorityContainer>
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

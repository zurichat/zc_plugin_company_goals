import React, { useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { useDispatch } from 'react-redux';

import { saveGoal } from '../../redux/newGoalSlice';

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
  AccessDiv,
  AccessButton,
  AccessText,
  GlobalStyles,
  TargetInput,
  TargetContainerB,
  TargetContainerA,
  PriorityContainer,
  PriorityDiv,
  PrioritySpan,
} from './GoalForm.style';
import img from './icon/active.png';
import lock from './icon/default.png';
import people from './icon/Group 2684.png';
import lightstar from './icon/Star 1.png';
import darkstar from './icon/Star 17.png';
import { firstLabel, PriorityLabel, secondLabel, thirdLabel } from './RadioInput';
import { LabelBody } from './RadioInput.style';

const GoalForm = React.forwardRef((props) => {
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
              <Input type="text" id="goalName" onChange={(e) => onInputChange(e)} />
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
                  <AccessDiv>
                    <AccessButton borderDetails="1px solid #00b87c">
                      <img src={people} alt="" />
                      <AccessText titleColor="#00b87c"> Zuri&apos;s workspace </AccessText>{' '}
                    </AccessButton>{' '}
                    <AccessButton borderDetails="1px solid #999999">
                      <img src={lock} alt="" />
                      <AccessText> Private </AccessText>{' '}
                    </AccessButton>
                  </AccessDiv>{' '}
                </div>{' '}
              </div>{' '}
              <Input type="text" id="goalAccess" onChange={(e) => onInputChange(e)} />
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
            <label htmlFor="date">
              <div>
                <Title titleColor="#393939"> Date for goal completion </Title>{' '}
                <Info textColor="#999999"> This is optional. </Info>{' '}
              </div>{' '}
              <Input
                type="text"
                id="date"
                onFocus={(e) => {
                  e.currentTarget.type = 'date';
                }}
                // eslint-disable-next-line no-return-assign
                onBlur={(e) => (e.currentTarget.type = 'text')}
                placeholder="End Date"
                onChange={(e) => onInputChange(e)}
              />
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
            <label htmlFor="target">
              <div>
                <Title titleColor="#393939"> Target Type </Title>{' '}
                <Info textColor="#999999">
                  This is optional.A short explanation on why the goal is set and how it can be achieved{' '}
                </Info>{' '}
              </div>{' '}
              <TargetContainerA>
                <FormControlLabel control={<Radio color="#999999" />} label={firstLabel()} labelPlacement="bottom" />
                <FormControlLabel control={<Radio color="#999999" />} label={secondLabel()} labelPlacement="bottom" />
                <FormControlLabel control={<Radio color="#999999" />} label={thirdLabel()} labelPlacement="bottom" />
              </TargetContainerA>
            </label>
            <TargetContainerB>
              <div>
                <LabelBody style={{ marginBottom: '0.5rem' }}>Start</LabelBody>
                <TargetInput type="text" name="" id="Start" />
              </div>
              <div>
                <LabelBody style={{ marginBottom: '0.5rem' }}>Target</LabelBody>
                <TargetInput type="text" name="" id="Target" />
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
            <Title titleColor="#393939">Set Goal Priority</Title>{' '}
            <PriorityContainer>
              <PriorityDiv>
                <FormControlLabel control={<Checkbox color="#999999" />} label={PriorityLabel('Low')} />
                <PrioritySpan>
                  <img src={lightstar} alt="" />
                </PrioritySpan>
              </PriorityDiv>
              <PriorityDiv>
                <FormControlLabel control={<Checkbox color="#999999" />} label={PriorityLabel('Medium')} />
                <PrioritySpan>
                  <img src={lightstar} alt="" />
                  <img src={lightstar} alt="" />
                </PrioritySpan>
              </PriorityDiv>
              <PriorityDiv>
                <FormControlLabel control={<Checkbox color="#999999" />} label={PriorityLabel('High')} />
                <PrioritySpan>
                  <img src={lightstar} alt="" />
                  <img src={lightstar} alt="" />
                  <img src={lightstar} alt="" />
                </PrioritySpan>
              </PriorityDiv>
              <PriorityDiv>
                <FormControlLabel
                  control={<Checkbox color="#999999" />}
                  label={PriorityLabel('Immediate(24hrs or Less')}
                />
                <PrioritySpan>
                  <img src={darkstar} alt="" />
                  <img src={darkstar} alt="" />
                  <img src={darkstar} alt="" />
                  <img src={darkstar} alt="" />
                </PrioritySpan>
              </PriorityDiv>
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

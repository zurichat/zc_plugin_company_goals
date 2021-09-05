import React, { useState } from 'react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { useDispatch, useSelector } from 'react-redux';

import { editGoal, selectGoal } from '../../features/goalSlice';

import {
  Goal,
  Form,
  Input,
  Button,
  Title,
  Info,
  Icon,
  Container,
  Box,
  CloseButton,
  CreateButton,
  AccessButton,
} from './EdiGoalForm.styled';
import img from './icon/active.png';
import lock from './icon/default.png';
import people from './icon/Group 2684.png';

const EditGoalForm = React.forwardRef(({handleClose}) => {
  // eslint-disable-next-line react/prop-types
  const { name, owner, status, endDate, category, description } = useSelector(selectGoal);
  const [user, setUser] = useState({
    name: '',
    owner: '',
    status: '',
    endDate: '',
    category: '',
    description: '',
  });


  const dispatch = useDispatch();

  const onInputChange = (e, propName) =>
    setUser((prevUser) => ({
      ...prevUser,
      [propName]: e.target.value,
    }));

  const onSave = (e) => {
    e.preventDefault();
    const keys = Object.keys(user);
    const canSave = keys.some((value) => Boolean(user[value]));
    
    if(canSave){
      const filteredUser=keys.reduce((tot,key)=>{
        if(user[key]){
          return { ...tot, [key]: user[key] };
        }
        return tot
      },{})
      
      dispatch(editGoal(filteredUser))
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
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="20px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="name">
              <Title titleColor="#393939"> Goal Name </Title>
              <Info textColor="#999999">
                Goals are high level containers that can be broken down into smaller target.Learn more{' '}
              </Info>{' '}
              <Input onChange={(e) => onInputChange(e, 'name')} type="text" id="name" defaultValue={name} />{' '}
            </label>{' '}
            <Box>
              <Button type="Button" buttonPadding="0.625rem 0.875rem" borderRadius="3px">
                Ok{' '}
                <CheckOutlinedIcon
                  style={{
                    marginLeft: '0.1rem',
                    fontSize: '12px',
                  }}
                />{' '}
              </Button>{' '}
              <Info textColor="#00b87c">
                press{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  ENTER{' '}
                </span>{' '}
              </Info>{' '}
            </Box>{' '}
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="20px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="owner">
              <div>
                <Title titleColor="#393939"> Owner </Title>{' '}
                <Info textColor="#999999"> This is optional, who will take responsibility for the goals </Info>{' '}
              </div>{' '}
              <Input
                onChange={(e) => onInputChange(e, 'owner')}
                type="text"
                id="name"
                placeholder="Mark Essien"
                defaultValue={owner}
              />{' '}
            </label>
            <Box>
              <Button type="Button" buttonPadding="0.625rem 0.875rem" borderRadius="3px">
                Ok{' '}
                <CheckOutlinedIcon
                  style={{
                    marginLeft: '0.1rem',
                    fontSize: '12px',
                  }}
                />{' '}
              </Button>{' '}
              <Info textColor="#00b87c">
                press{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  ENTER{' '}
                </span>{' '}
              </Info>{' '}
            </Box>{' '}
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="20px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="owner">
              <div>
                <Title titleColor="#393939"> Who has access to this goal ? </Title>{' '}
                <div
                  style={{
                    marginTop: '2rem',
                  }}
                >
                  {' '}
                  {status === true ? (
                    <>
                      <AccessButton active>
                        <img src={people} alt="" />
                        <Title active> Zuri & apos; s workspace </Title>{' '}
                      </AccessButton>{' '}
                      <AccessButton>
                        <img src={lock} alt="" />
                        <Title> Private </Title>{' '}
                      </AccessButton>{' '}
                    </>
                  ) : (
                    <>
                      <AccessButton>
                        <img src={people} alt="" />
                        <Title> Zuri & apos; s workspace </Title>{' '}
                      </AccessButton>{' '}
                      <AccessButton active>
                        <img src={lock} alt="" />
                        <Title active> Private </Title>{' '}
                      </AccessButton>{' '}
                    </>
                  )}{' '}
                </div>{' '}
              </div>{' '}
              <Input onChange={(e) => onInputChange(e, 'status')} type="text" id="name" defaultValue={status} />{' '}
            </label>
            <Box>
              <Button type="Button" buttonPadding="0.625rem 0.875rem" borderRadius="3px">
                Ok{' '}
                <CheckOutlinedIcon
                  style={{
                    marginLeft: '0.1rem',
                    fontSize: '12px',
                  }}
                />{' '}
              </Button>{' '}
              <Info textColor="#00b87c">
                press{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  ENTER{' '}
                </span>{' '}
              </Info>{' '}
            </Box>{' '}
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="20px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div>
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
                onChange={(e) => onInputChange(e, 'endDate')}
                // eslint-disable-next-line no-return-assign
                onBlur={(e) => (e.currentTarget.type = 'text')}
                placeholder="End Date"
                defaultValue={endDate}
              />{' '}
            </label>
            <Box>
              <Button type="Button" buttonPadding="0.625rem 0.875rem" borderRadius="3px">
                Ok{' '}
                <CheckOutlinedIcon
                  style={{
                    marginLeft: '0.1rem',
                    fontSize: '12px',
                  }}
                />{' '}
              </Button>{' '}
              <Info textColor="#00b87c">
                press{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  ENTER{' '}
                </span>{' '}
              </Info>{' '}
            </Box>{' '}
          </div>{' '}
        </Container>{' '}
        <Container>
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="20px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="category">
              <div>
                <Title titleColor="#393939"> Category </Title>{' '}
                <Info textColor="#999999">
                  This is optional.A categorization that will help in sorting from multiples{' '}
                </Info>{' '}
              </div>{' '}
              <Input
                onChange={(e) => onInputChange(e, 'category')}
                type="text"
                id="category"
                placeholder="Product Design"
                defaultValue={category}
              />{' '}
            </label>
            <Box>
              <Button type="Button" buttonPadding="0.625rem 0.875rem" borderRadius="3px">
                Ok{' '}
                <CheckOutlinedIcon
                  style={{
                    marginLeft: '0.1rem',
                    fontSize: '12px',
                  }}
                />{' '}
              </Button>{' '}
              <Info textColor="#00b87c">
                press{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  ENTER{' '}
                </span>{' '}
              </Info>{' '}
            </Box>{' '}
          </div>{' '}
        </Container>{' '}
        <Container>
          {' '}
          <Icon>
            <img
              src={img}
              alt="icon"
              width="20px"
              height="20px"
              style={{
                paddingTop: '0.6rem',
              }}
            />{' '}
          </Icon>{' '}
          <div>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="description">
              <div>
                <Title titleColor="#393939"> Description </Title>{' '}
                <Info textColor="#999999">
                  This is optional.A short explanation on why the goal is set and how it can be achieved{' '}
                </Info>{' '}
              </div>{' '}
              <Input
                onChange={(e) => onInputChange(e, 'description')}
                type="text"
                id="name"
                defaultValue={description}
              />{' '}
            </label>
            <Box>
              <Button type="Button" buttonPadding="0.625rem 0.875rem" borderRadius="3px">
                Ok{' '}
                <CheckOutlinedIcon
                  style={{
                    marginLeft: '0.1rem',
                    fontSize: '12px',
                  }}
                />{' '}
              </Button>{' '}
              <Info textColor="#00b87c">
                press{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  ENTER{' '}
                </span>{' '}
              </Info>{' '}
            </Box>{' '}
          </div>{' '}
        </Container>{' '}
        <CreateButton>
          <Button onClick={(e) => onSave(e)} type="submit" buttonPadding="1rem 4rem" borderRadius="6px">
            Save Change{' '}
          </Button>{' '}
        </CreateButton>{' '}
      </Form>{' '}
    </Goal>
  );
});

export default EditGoalForm;

import { useDispatch } from 'react-redux';
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
import styled from 'styled-components';

import img from './images/Group 2686.png';
import { NavName, CreateGoalButton } from './NavName';
import { getGoals } from '../../redux/showGoalSlice';

const GridLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Sort = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 89px;
  height: 32px;
  justify-self: flex-end;
  border: 1px solid #00b87c;
  background: #ffffff;
  border-radius: 3px;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #00b87c;
  cursor: pointer;
  margin-right: 1rem;
  position: relative;
`;

const SortDrpDw = styled.div`
  height: 270px;
  width: 185px;

  visibility: hidden;
  opacity: 0;

  background-color: #fff;
  position: absolute;
  right: -170px;
  bottom: -275px;
  box-shadow: -2px -2px 3px 0 #95959548, 2px 2px 3px 0 #95959548;
  border-radius: 5px;
  padding: 7px;
  transition: all 0.2s linear;
  text-align: left;

  ul {
    color: #828282;
    font-size: 18px;
    list-style: none;
    li {
      padding: 3px;
      margin: 15px 7px;
    }
  }

  &.active {
    right: 0px;
    z-index: 10;
    visibility: visible;
    opacity: 1;
    transition: all 0.2s linear;
  }
`;
const NavDiv = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    width: 60% !important;
    div {
      width: 30% !important;
      margin-right: 0 !important;
    }
  }
  @media screen and (max-width: 420px) {
    width: 65% !important;
    div {
      width: 30% !important;
      margin-right: 0 !important;
      font-size: 0.7rem;
      padding: 0 0 1rem 0;
      text-align: center !important;
    }
    button {
      margin-bottom: 1rem !important;
      padding: 0 !important;
      span {
        font-size: 0.7rem !important;
      }
    }
  }
`;

const GoalsNavLayout = () => {
  const dispatch = useDispatch();

  const getData = (param) => {
    let requestURL;
    if (param === 'all') {
      requestURL = `https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&page=1&limit=3&sort=create_at`;
    } else {
      requestURL = `https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&page=1&limit=3&sort=create_at&type=${param}`;
    }

    dispatch(getGoals(requestURL));
  };
  const clickAllHandler = async () => {
    getData('all');
  };
  const clickAnnualHandler = () => {
    getData('annual');
  };
  const clickQuarterlyHandler = () => {
    getData('quarterly');
  };
  return (
    <GridLayout>
      <NavDiv>
        <NavName className="active" onClick={clickAllHandler}>
          {' '}
          all goals{' '}
        </NavName>{' '}
        <NavName onClick={clickAnnualHandler}> annual goals </NavName>
        <NavName onClick={clickQuarterlyHandler}> quaterly goals </NavName>
      </NavDiv>
      <CreateGoalButton onClick={() => dispatch(toggleCreateGoalModalAction())}>&#43; new goal</CreateGoalButton>
    </GridLayout>
  );
};

export default GoalsNavLayout;

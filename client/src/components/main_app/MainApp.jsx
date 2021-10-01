import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import InnerNav from '../goal_interface_inner_header/InnerNav';
import GoalsNavLayout from '../goal_interface_navbar/NavLayout';
import ReportsAndNotificationContainer from '../reports_and_notifications/ReportsAndNotificationContainer';
import GoalDetailAccordion from '../GoalDetailAccordion/GoalDetails';
import { useState } from 'react';

function MainApp() {
  const [state, setstate] = useState('all');
  const changeState = (type) => {
    setstate(type);
  };
  return (
    <MainAppContainer>
      {/* */}
      <GoalsDisplayContainer>
        <GoalsNavLayout onSetState={changeState} />
        <Goal>
          <InnerNav />
          <GoalDetailAccordion selectedGoals={state} />
        </Goal>
      </GoalsDisplayContainer>
      {/* */}

      <GoalsReportAndNotificationContainer>
        <ReportsAndNotificationContainer />
      </GoalsReportAndNotificationContainer>
    </MainAppContainer>
  );
}

export default MainApp;

const MainAppContainer = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 70%;
  margin-top: 1rem;
  @media screen and (max-width: 714px) {
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
  }
`;

const GoalsDisplayContainer = styled.div`
  width: 69%;
  height: 100%;
  @media only screen and (max-width: 960px) {
    width: 59%;
  }
  @media only screen and (max-width: 714px) {
    width: 100%;
  }
`;

const GoalsReportAndNotificationContainer = styled.div`
  /* border: 1px solid blue; */
  width: 30%;
  height: 100%;
  @media only screen and (max-width: 960px) {
    width: 40%;
  }
  @media only screen and (max-width: 714px) {
    margin-top: 2rem;
    width: 100%;
  }
`;
const Goal = styled.div`
  height: 100%;
  /* border: 1px solid red; */

  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* padding: 50px 0; */
  background: red;
  background: ${(props) => (props.primary ? 'white' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.1);
`;

const Link = styled(RouterLink)`
  font-size: 24px;
  background-color: #00b87c;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 15px;
  text-decoration: none;
  margin: 50px 45%;
`;

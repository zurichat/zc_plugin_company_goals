import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import InnerNav from '../goal_interface_inner_header/InnerNav';
import GoalsNavLayout from '../goal_interface_navbar/NavLayout';
import ReportsAndNotificationContainer from '../reports_and_notifications/ReportsAndNotificationContainer';
import GoalDetailAccordion from '../GoalDetailAccordion/GoalDetails';

function MainApp() {
  return (
    <MainAppContainer>
      <GoalsDisplayContainer>
        <GoalsNavLayout />
        <Goal>
          <InnerNav />
          <GoalDetailAccordion />
        </Goal>
      </GoalsDisplayContainer>
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
  margin-top: 3.22rem;
  /* border: 1px solid yellow; */
`;

const GoalsDisplayContainer = styled.div`
  flex-basis: 65%;
  /* border: 1px solid green; */
`;

const GoalsReportAndNotificationContainer = styled.div`
  /* border: 1px solid blue; */
  flex-basis: 34%;
`;
const Goal = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* padding: 50px 0; */
  background: red;
  background: ${(props) => (props.primary ? 'white' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.5);
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

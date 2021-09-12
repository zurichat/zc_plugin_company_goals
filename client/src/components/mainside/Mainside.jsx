// eslint-disable-next-line import/no-unresolved
import styled from 'styled-components';


import EmptyGoal from 'components/empty-goal-interface/EmptyGoal';
import InnerNav from 'components/goal_interface_inner_header/InnerNav';
import GoalDetailAccordion from 'components/GoalDetailAccordion/GoalDetails';
// import GetGoals from '../getGoals/getGoals';
import GoalsNavLayout from '../goal_interface_navbar/NavLayout';
import GoalItem from '../Goals/GoalItem';
import HistoryList from '../history/historyList';
// import Menuoption from '../Menuoption/Menuoption';
import ReportsAndNotificationContainer from '../reports_and_notifications/ReportsAndNotificationContainer';
import UnAchiveModal from '../UnAchivedGoals/UnAchiveModal';

function Mainside() {
  return (
    <Main>
      <GoalsDisplayContainer>
        {/* <GoalsNavLayout /> */}
          {/* <Menuoption /> */}
          <GoalDetailAccordion />
        
        <GoalsNavLayout />
        <Goal>
          <InnerNav />
          <EmptyGoal />
          {/* <Menuoption /> */}
          {/* <GetGoals /> */}
        </Goal>
        {/* <Goal> //Goal container isnt needed for the GoalItem again.
          <Menuoption /> //whoever is setting up can enable this and see how it looks.
        </Goal> */}
        {/* //PS => The repition of the Goal Item is only temporary */}
        {/* <GoalItem />
        <GoalItem />
        <GoalItem />
        <GoalItem />
        <GoalItem />
        <GoalItem />
        <GoalItem />
        <GoalItem /> */}
      </GoalsDisplayContainer>
      <GoalsReportAndNotificationContainer>
        <ReportsAndNotificationContainer />
        <HistoryList />
        {/* <Goal primary>
          <Report />
          <Notification />
        </Goal> */}
      </GoalsReportAndNotificationContainer>
    </Main>
  );
}

export default Mainside;

const Main = styled.div`
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

// eslint-disable-next-line import/no-unresolved
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import Timeline from '../Sortoptions/Timeline';
import Category from '../Sortoptions/Category';
import Date from '../Sortoptions/Date';
import Progress from '../Sortoptions/Progress';
import MenuOption from '../Sortoptions/MenuOption';
import EmptyGoal from '../empty-goal-interface/EmptyGoal';
import Error from '../error/Error';
// import Design from '../Dropdown/Design';
// import MenuOption from '../Dropdown/MenuOption';
// import Mobile from '../Dropdown/Mobile';
// import MobilePrivate from '../Dropdown/MobilePrivate';
import InnerNav from '../goal_interface_inner_header/InnerNav';
// import GetGoals from '../getGoals/getGoals';
// eslint-disable-next-line import/no-unresolved

//import ExportReport from 'components/Modal/ExportModal/ExportReport';

import { getGoals } from '../../redux/showGoalSlice';
import GoalsNavLayout from '../goal_interface_navbar/NavLayout';
import GoalItem from '../Goals/GoalItem';
import HistoryList from '../history/historyList';
// import Menuoption from '../Menuoption/Menuoption';
import ReportsAndNotificationContainer from '../reports_and_notifications/ReportsAndNotificationContainer';
import Loader from '../loader/loader';
import GoalDetailAccordion from '../GoalDetailAccordion/GoalDetails';
import { MainSection } from './Mainside.styled';
// import UnAchiveModal from '../UnAchivedGoals/UnAchiveModal';

export default function Mainside({ className }) {
  console.log(errorMessage);
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.list);
  const status = useSelector((state) => state.goals.status);
  const errorMessage = useSelector((state) => state.goals.errorMessage);

  useEffect(() => {
    dispatch(getGoals()).catch((obj) => {
      console.log('Shite!');
    });
  }, [dispatch]);

  const hasGoal = goals.data ? 1 : 0;

  return (
    <MainSection className={className}>
      <Main>
        <GoalsDisplayContainer>
          <GoalsNavLayout />
          <Goal>
            <InnerNav />
            {status === 'loading' && <Loader />}
            {status === 'success' && !hasGoal && <EmptyGoal />}
            {status === 'failed' && <Error errorMessage={errorMessage} />}
            {
              /* //PS => The repition of the Goal Item is only temporary */
              status === 'success' &&
                hasGoal &&
                goals.data.map((goal, id) => {
                  return <GoalItem goalData={goal} key={id} />;
                })
            }
            {/* <Menuoption /> */}
            {/* <GetGoals /> */}
          </Goal>
          {/* <Goal> //Goal container isnt needed for the GoalItem again.
          <Menuoption /> //whoever is setting up can enable this and see how it looks.
        </Goal> */}

          {/* {status === 'failed' && (
            <Error/> */}
          {/* A button might be here to retry and this errorMessage will be in the error UI*/}
          {/* {errorMessage}
            </p>
          )} */}
        </GoalsDisplayContainer>
        <GoalsReportAndNotificationContainer>
          <ReportsAndNotificationContainer />
          {/* <HistoryList /> */}
          {/* <Goal primary>
          <Report />
          <Notification />
        </Goal> */}
          {/* <Link to="/faqs">Faqs</Link> */}
        </GoalsReportAndNotificationContainer>
      </Main>
      {/* <ExportReport /> */}
      {/* the dropdown for the main menu and others */}

      <MenuOption />
      <Category />
      <Date />
      <Progress />
      <Timeline />
    </MainSection>
  );
}

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 3.22rem;
  height: 80%;
`;

const GoalsDisplayContainer = styled.div`
  width: 69% !important;
  height: 100% !important;
  /* border: 1px solid green; */
`;

const GoalsReportAndNotificationContainer = styled.div`
  /* border: 1px solid blue; */
  width: 30% !important;
  height: 100% !important;
`;
const Goal = styled.div`
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

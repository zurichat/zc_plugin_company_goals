import SimpleModal from '../createGoal/CreateGoal';
import BasicModal from '../EditGoal/EditGoal';
import NavLayout from '../goal interface navbar/NavLayout';
import Header from '../header/Header';
import { Goal, MainContainer, GoalContainer, GoalContainer1 } from './mainside.styled.js';

function Mainside() {
  return (
    <div>
        <Header />
      <MainContainer>
        <GoalContainer>
          <NavLayout />
          <Goal>
            {' '}
            <SimpleModal /> <BasicModal />
          </Goal>
        </GoalContainer>
        <GoalContainer1>
          <Goal primary />
        </GoalContainer1>
      </MainContainer>
    </div>
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
  padding: 50px 0;
  background: red;
  background: ${(props) => (props.primary ? 'white' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.5);
`;


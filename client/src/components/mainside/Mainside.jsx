<<<<<<< HEAD
import styled from 'styled-components';
import Deletemodal from '../Deletemodal/Deletemodal'
import NavLayout from '../goal interface navbar/NavLayout';
import BasicModal from '../EditGoal/EditGoal';

import Report from '../updates/Report'


import SimpleModal from '../createGoal/CreateGoal';

import NotificationBar from '../notificationBar/NotificationBar';


const Mainside = () => {
  return (
    <div>
    <NavLayout />


    <MainContainer>
      <Goal>
        <SimpleModal />
        <Deletemodal />
        <BasicModal/>
      </Goal>
      <Goal primary>
    {/* <Report /> */}
        <NotificationBar />
      </Goal>
    </MainContainer>
    </div>
  );
};

export default Mainside;

const MainContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  height: 50%;
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
  margin: 10px;
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.5);
`;
=======
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
>>>>>>> 059ada13a1c9c03a617fafd6d23a26b7877944a4

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

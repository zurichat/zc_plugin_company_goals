import styled from 'styled-components';

import BasicModal from '../EditGoal/EditGoal';

import SimpleModal from '../createGoal/CreateGoal';
import Notification from '../Notification/Notification';

const Mainside = () => {
  return (
    <MainContainer>
      <Goal>
        {' '}
        <SimpleModal />
        <BasicModal />
      </Goal>
      <Goal primary>
        {/* goal tools like calendar, reports  .. go inside this component  */}
        <Notification />
      </Goal>
    </MainContainer>
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

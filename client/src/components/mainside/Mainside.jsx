import styled from 'styled-components';

import SimpleModal from '../createGoal/CreateGoal';
import HistoryList from '../history/historyList';

const Mainside = () => {
  return (
    <MainContainer>
      <Goal>
        <SimpleModal />
      </Goal>
      <Goal primary>
        {/* goal tools like calendar, reports  .. go inside this component  */}
        <HistoryList />
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
  padding-top: 200px;
  background: red;
  height: 40vh;
  background: ${(props) => (props.primary ? 'white' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  margin: 10px;
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.5);
`;

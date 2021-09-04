import styled from 'styled-components';
import SimpleModal from '../createGoal/CreateGoal';
import Deletemodal from '../Deletemodal/Deletemodal';
import NavLayout from '../goal interface navbar/NavLayout';
import BasicModal from '../EditGoal/EditGoal';
import Notification from '../Notification/Notification';

const Mainside = () => {
  return (
    <div>
      <NavLayout />
      <MainContainer>
        <Goal>
          {' '}
          <SimpleModal /> <Deletemodal />{' '}
        </Goal>
        <NavLayout />
        <Goal>
          {' '}
          <SimpleModal /> <BasicModal />
        </Goal>
        <Goal primary>{/* goal tools like calendar, reports  .. go inside this component  */}</Goal>
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
  padding-top: 200px;
  background: red;
  height: 40vh;
  background: ${(props) => (props.primary ? 'white' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  margin: 10px;
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.5);
`;

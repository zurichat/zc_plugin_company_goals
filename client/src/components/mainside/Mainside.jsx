import styled from 'styled-components';

const Mainside = () => {
  return (
    <MainContainer>
      <Goal>{/*  goal components i.e create goal component go inside this component  */}create goals</Goal>
      <Goal primary>{/* goal tools like calendar, reports  .. go inside this component  */}calender/reports/</Goal>
    </MainContainer>
  );
};

export default Mainside;

const MainContainer = styled.div`
  display: flex;
  margin-right: 2rem;
`;
const Goal = styled.div`
  flex: 1;
  background: red;
  background: ${(props) => (props.primary ? 'black' : 'green')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  margin-right: ${(props) => (props.primary ? '0' : '20px')};
`;

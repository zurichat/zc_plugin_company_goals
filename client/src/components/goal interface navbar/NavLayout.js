import styled from 'styled-components';

import img from './images/Group 2686.png';
import NavName from './NavName';

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 3fr;
  padding: 0.43rem 1rem 0.03rem;
  place-items: center;
`;

const Sort = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 89px;
  height: 32px;
  justify-self: flex-end;
  border: 1px solid #00b87c;
  background: #ffffff;
  border-radius: 3px;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #00b87c;
  cursor: pointer;
  margin-right: 1rem;
`;
const GoalsNavLayout = () => {
  return (
    <GridLayout>
      <NavName className="active"> all goals </NavName> <NavName> annual goals </NavName>
      <NavName> quaterly goals </NavName>
      <Sort>
        <div> Sort by </div> <img src={img} alt="sort icon" />
      </Sort>
    </GridLayout>
  );
};

export default GoalsNavLayout;

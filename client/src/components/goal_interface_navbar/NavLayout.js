import styled from 'styled-components';

import img from './images/Group 2686.png';
import NavName from './NavName';

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2.5fr;
  padding: 0.43rem 1rem 0.03rem;
  place-items: center;
`;

const Sort = styled.button`
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
  position: relative;
`;

const SortDrpDw = styled.div`
  height: 270px;
  width: 185px;

  visibility: hidden;
  opacity: 0;

  background-color: #fff;
  position: absolute;
  right: -170px;
  bottom: -275px;
  box-shadow: -2px -2px 3px 0 #95959548, 2px 2px 3px 0 #95959548;
  border-radius: 5px;
  padding: 7px;
  transition: all 0.2s linear;
  text-align: left;

  ul {
    color: #828282;
    font-size: 18px;
    list-style: none;
    li {
      padding: 3px;
      margin: 15px 7px;
    }
  }

  &.active {
    right: 0px;
    z-index: 10;
    visibility: visible;
    opacity: 1;
    transition: all 0.2s linear;
  }
`;
const GoalsNavLayout = () => {
  function showDrpDw() {
    const sortDrpContainer = document.getElementById('sort_drop_down');
    sortDrpContainer.classList.toggle('active');
  }

  return (
    <GridLayout>
      <NavName className="active"> all goals </NavName> <NavName> annual goals </NavName>
      <NavName> quaterly goals </NavName>
      <Sort type="button" onClick={() => showDrpDw()}>
        <div> Sort by </div> <img src={img} alt="sort icon" />
        <SortDrpDw id="sort_drop_down" className="drop">
          <ul>
            <li>More Recent</li>
            <li>Date</li>
            <li>Progress </li>
            <li>Category </li>
            <li>Visibility </li>
            <li>Timeline </li>
          </ul>
        </SortDrpDw>
      </Sort>
    </GridLayout>
  );
};

export default GoalsNavLayout;

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Mainside from '../components/mainside/Mainside';


import EditMission from '../components/Modal/EditMisssion';

import EditVision from '../components/Modal/EditVision';
import Nav from '../components/navbar/Navbar';
import Goals from '../components/getGoals/getGoals'

function App() {
  return (
    <div>
      <PluginSide>
        <Nav />
        <Mainside />
        {/* <Deletemodal /> this is rendering above components..whoever is to work on it, should render it conditionally */}
        <EditMisssion />
        <EditVision />
        <Goals />
      </PluginSide>
    </div>
  );
}

App.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom:20px;
`;

import styled from 'styled-components';

import AppHeader from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import EditMission from '../components/modal/EditMission';
import Nav from '../components/navbar/Navbar';

function App() {
  return (
    <div>
      <AppHeader />
      <PluginSide>
        <Nav />
        <Mainside />
        <EditMission />
      </PluginSide>
    </div>
  );
}

export default App;

const PluginSide = styled.div`
  width: 70%;
  float: right;
  background-color: #f6f6f6;
`;

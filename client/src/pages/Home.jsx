import styled from 'styled-components';

import Header from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import EditVision from '../components/Modal/EditVision';
import Nav from '../components/navbar/Navbar';

function App() {
  return (
    <div>
      <PluginSide>
        <Nav />
        <Mainside />
        {/* <Deletemodal /> this is rendering above components..whoever is to work on it, should render it conditionally */}
        <EditVision />
        <Header />
        <Mainside />
      </PluginSide>
    </div>
  );
}

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom: 20px;
`;

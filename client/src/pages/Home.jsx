import styled from 'styled-components';
import Deletemodal from '../components/Deletemodal/Deletemodal';
import AppHeader from '../components/header/Header';
import Header from '../components/header/Header'
import Mainside from '../components/mainside/Mainside';
import Nav from '../components/navbar/Navbar';

function App() {
  return (
    <div>
      
      <PluginSide>
        <Nav />
        <Mainside />
        <Deletemodal />
        <Header />

      </PluginSide>
      <Mainside />
    </div>
  );
}

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom:20px;
`;

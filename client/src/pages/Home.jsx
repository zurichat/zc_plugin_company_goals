import styled from 'styled-components';
import Header from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import Nav from '../components/navbar/Navbar';
import Goals from '../components/getGoals/getGoals';

function App() {
  return (
    <div>
      <PluginSide>
        <Nav />
        <Header />
      </PluginSide>
      <Mainside />
      <Goals />
    </div>
  );
}

export default App;

const PluginSide = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom: 20px;
`;

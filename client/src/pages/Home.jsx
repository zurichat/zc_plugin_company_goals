import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../components/header/Header';
import Mainside from '../components/mainside/Mainside';
import Nav from '../components/navbar/Navbar';

function App({ onSearch }) {
  return (
    <div>
      <PluginSide>
        <Nav onSearch={onSearch} />
        <Header />
      </PluginSide>
      <Mainside />
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
  padding-bottom: 20px;
`;

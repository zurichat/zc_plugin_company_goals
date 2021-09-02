import { StyledAppBar, StyledToolBar } from './Header.styled';
import Report from '../updates/Report'

const AppHeader = () => {
  return (
   <div>
      <StyledAppBar position="static">
      <StyledToolBar>
        <h1>
          Welcome to Zuri Chat  Plugin{' '}
          <span role="img" aria-label="celebrate emoji">
            🥳
          </span>
        </h1>
      </StyledToolBar>
      
    </StyledAppBar>
    <Report />
   </div>
  );
};

export default AppHeader;

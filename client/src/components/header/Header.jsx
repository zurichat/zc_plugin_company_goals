import { StyledAppBar, StyledToolBar } from './Header.styled';

const AppHeader = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolBar>
        <h1>
          You are welcome to Zuri Chat Goals Plugin{' '}
          <span role="img" aria-label="celebrate emoji">
            🥳
          </span>
        </h1>
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default AppHeader;

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: black;
  
`;

const StyledToolBar = styled(ToolBar)`
  justify-content: space-between;
  padding: 0 2rem;
  
`;

export { StyledAppBar, StyledToolBar };

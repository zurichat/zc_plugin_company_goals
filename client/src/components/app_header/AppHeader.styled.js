import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

const HeaderAppBar = styled(AppBar)`
  background-color: #00b87c;
`;

const HeaderToolBar = styled(ToolBar)`
  justify-content: space-between;
  padding: 0 0.96rem;

  @media (min-width: 600px) {
    &.MuiToolbar-regular {
      min-height: 55px;
    }
  }
`;

const HeaderToolBarTitle = styled(Typography)`
  font-weight: bold;
  font-size: 1.125rem;
  text-transform: capitalize;
`;

export { HeaderAppBar, HeaderToolBar, HeaderToolBarTitle };

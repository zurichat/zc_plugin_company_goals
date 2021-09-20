import { HeaderAppBar, HeaderToolBar, HeaderToolBarTitle } from './AppHeader.styled';
import HeaderAvatarGroup from './components/header_avatar_group/HeaderAvatarGroup';

const AppHeader = () => (
  <HeaderAppBar elevation={false} position="static">
    <HeaderToolBar>
      <HeaderToolBarTitle># company goals</HeaderToolBarTitle>
      <HeaderAvatarGroup />
    </HeaderToolBar>
  </HeaderAppBar>
);

export default AppHeader;

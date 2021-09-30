import { useEffect } from 'react';
import axios from 'axios';
import { HeaderAppBar, HeaderToolBar, HeaderToolBarTitle } from './AppHeader.styled';
import HeaderAvatarGroup from './components/header_avatar_group/HeaderAvatarGroup';
import { GetUserInfo, GetWorkspaceUsers } from '@zuri/control';

function AppHeader() {
  const { data } = GetUserInfo();
  console.log(data);

  return (
    <HeaderAppBar elevation={false} position="static">
      <HeaderToolBar>
        <HeaderToolBarTitle># company goals</HeaderToolBarTitle>
        <HeaderAvatarGroup />
      </HeaderToolBar>
    </HeaderAppBar>
  );
}

export default AppHeader;

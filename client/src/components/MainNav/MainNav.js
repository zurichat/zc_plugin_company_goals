import React from 'react';
import {
  Search,
  SettingsIconStyled,
  AvatarContainer,
  Main,
  SearchIconStyled,
  Header,
  MobileIconStyled,
  Text,
  MobileAvatarContainer,
} from './MainNav.styled.js';
import settings from '../../Images/svg/settings.svg';
import avatar from '../../Images/png/People of Brooklyn Avatarpeoplebrooklyn.png';
import mobileavatar from '../../Images/svg/mobileavatar.svg';
import menubar from '../../Images/svg/menubar.svg';
import searchbar from '../../Images/svg/searchbar.svg';

const MainNav = () => {
  return (
    <div>
      <Main>
        <Search type="text" placeholder="Search here" />
        <SettingsIconStyled src={settings} alt="settting" />
        <AvatarContainer>
          <SearchIconStyled src={avatar} alt="avatar" />
        </AvatarContainer>
      </Main>
      <Header>
        <MobileIconStyled src={menubar} alt="menubar" />
        <Text>Company Goals</Text>
        <MobileIconStyled src={searchbar} alt="searchbar" />
        <MobileAvatarContainer>
          <SearchIconStyled src={mobileavatar} alt="avatar" />
        </MobileAvatarContainer>
      </Header>
    </div>
  );
};

export default MainNav;

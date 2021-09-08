import { useState } from 'react';

import PropTypes from 'prop-types';

import profileImage from '../../Images/Group 348.png';

import { useDispatch } from 'react-redux';

import search from '../../Images/search.svg';
import settings from '../../Images/settings.svg';

import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
import SearchResults from '../searchBarDisplay/Search';
import {
  Nav,
  TopBarContainer,
  Menu,
  MenuLink,
  MenuLink1,
  SearchContainer,
  AddIconStyled,
  SearchInput,
  SearchIconStyled,
  SettingsIconStyled,
  Header,
  HeaderText,
  ProfileImageContainer,
} from './navbar.styled';
import SearchInteractive from '../Searchinteractive/SearchInteractive';

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [searchState, setSearchState] = useState('');
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    const value = event.type === 'blur' ? '' : event.target.value;
    setSearchState(value);
    setDisplay(true);
  };
  return (
    <div>
      <Nav>
        {/* <Menu>
          <MenuLink1 onClick={() => dispatch(toggleCreateGoalModalAction())}>
            <AddIconStyled />
            New Goal
          </MenuLink1>
          <MenuLink primary>Archived Goals</MenuLink>
        </Menu> */}
        <TopBarContainer>
          <SearchContainer>
            <SearchIconStyled src={search} alt="search" />
            <SearchInput type="text" placeholder="Search" onChange={handleSearch} onBlur={handleSearch} />
            {searchState && <SearchInteractive />}
          </SearchContainer>

          <SettingsIconStyled src={settings} alt="settting" />

          <ProfileImageContainer>
            <img src={profileImage} alt="User Profile" />
          </ProfileImageContainer>
        </TopBarContainer>
      </Nav>

      <Header>
        <HeaderText>Company Goals</HeaderText>
      </Header>
    </div>
  );
};

Navbar.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;

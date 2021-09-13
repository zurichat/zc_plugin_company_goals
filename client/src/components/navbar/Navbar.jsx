import { useState } from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import search from '../../Images/search.svg';
import settings from '../../Images/settings.svg';

import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
// import SearchResults from '../searchBarDisplay/Search';
import SearchInteractive from '../Searchinteractive/SearchInteractive';
import {
  Nav,
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
} from './navbar.styled';

const Navbar = () => {
  const [searchState, setSearchState] = useState('');
  console.log(searchState);

  const dispatch = useDispatch();

  // const handleSearch = (event) => {
  //   const value = event.type === 'blur' ? '' : event.target.value;
  //   setSearchState(value);
  // };

  const handleEdit = (e) => {
    setSearchState(e.target.value);
  };

  return (
    <div>
      <Header>
        <HeaderText>Company Goals</HeaderText>
      </Header>
      <Nav>
        <Menu>
          <MenuLink1 onClick={() => dispatch(toggleCreateGoalModalAction())}>
            <AddIconStyled />
            New Goal
          </MenuLink1>
          <MenuLink primary>Archived Goals</MenuLink>
        </Menu>

        <SearchContainer>
          <SearchIconStyled src={search} alt="search" />
          <SearchInput value={searchState} type="text" placeholder="Search" onChange={handleEdit} />
          <SearchInteractive searchState={searchState} />
        </SearchContainer>

        <SettingsIconStyled src={settings} alt="settting" />
      </Nav>
    </div>
  );
};

Navbar.propTypes = {
  searchState: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;

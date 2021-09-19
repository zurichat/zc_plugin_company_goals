import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import search from '../../Images/svg/search.svg';
import settings from '../../Images/svg/settings.svg';

import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
<<<<<<< HEAD
=======

// import SearchResults from '../searchBarDisplay/Search';

>>>>>>> 5c060c4902863e3c47b41425f48de511794d6b8b
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
  const [display, setDisplay] = useState(false)
  const [searchState, setSearchState] = useState('');

  const dispatch = useDispatch();

  const handleEdit = (e) => {
    setSearchState(e.target.value);
    setDisplay(true);
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
          {searchState && <SearchInteractive searchState={searchState} />}
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

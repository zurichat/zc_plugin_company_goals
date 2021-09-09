import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import search from '../../Images/svg/search.svg';
import settings from '../../Images/svg/settings.svg';
import { toggleCreateGoalModalAction } from '../../redux/toggleCreateGoalModal.slice';
import SearchResults from '../searchBarDisplay/Search';
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
          <SearchInput type="text" placeholder="Search" onChange={handleSearch} onBlur={handleSearch} />
          {searchState && <SearchInteractive />}
        </SearchContainer>

        <SettingsIconStyled src={settings} alt="settting" />
      </Nav>
    </div>
  );
};

Navbar.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;

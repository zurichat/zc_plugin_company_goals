import { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';


import PropTypes from 'prop-types';
import styled from 'styled-components';

import search from '../../Images/search.svg';
import settings from '../../Images/settings.svg';

import SearchResults from '../searchBarDisplay/Search';

const Navbar = () => {
  const [searchState, setSearchState] = useState('');
  const handleSearch = (event) => {
    const value = event.type === 'blur' ? '' : event.target.value;
    setSearchState(value);
  };
  return (
    <div>
      <Header>
        <HeaderText>Company Goals</HeaderText>
      </Header>
      <Nav>
        <Menu>
          <MenuLink1>
            <AddIconStyled />
            New Goal
          </MenuLink1>
          <MenuLink primary>Archived Goals</MenuLink>
        </Menu>

        <SearchContainer>
          <SearchIconStyled src={search} alt="search" />
          <SearchInput type="text" placeholder="Search" onChange={handleSearch} onBlur={handleSearch} />
          {searchState && <SearchResults />}
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

const Nav = styled.div`
  padding: 0.5rem 0;
  padding-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  height: 57px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const MenuLink = styled.a`
  background: ${(props) => (props.primary ? 'white' : '#00b87c')};
  color: ${(props) => (props.primary ? '#00b87c' : 'white')};
  border: 2px solid #00b87c;
  border-radius: 3px;
  /* min-width: 110px; */
  cursor: pointer;
  padding: 6px 14px;
  margin-right: 19px;
`;

const MenuLink1 = styled.a`
  background: #00b87c;
  color: white;
  padding: 6px 14px;
  border: 2px solid #00b87c;
  border-radius: 3px;
  margin: 0 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* max-width: 110px; */
  cursor: pointer;
`;
const SearchContainer = styled.div`
  background: #f0f0f0;
  width: 20%;
  padding: 0 0 0 10px;
  border-radius: 15px;
  position: relative;
  cursor: text;
`;
const AddIconStyled = styled(AddIcon)`
  font-size: 1.2rem;
  margin-right: 4px;
`;
const SearchInput = styled.input`
  padding: 12px 10px 13px;
  outline: none;
  border: none;
  background: transparent;
  color: #f0f0f0;
  width: 80%;
  margin-left: 35px;
  font-size: 13px;
`;

const SearchIconStyled = styled.img`
  position: absolute;
  top: 10.5px;
  left: 22.5px;
  padding-right: 11.75px;
  cursor: pointer;
`;

const SettingsIconStyled = styled.img`
  color: #999999;
  margin-left: 15px;
  cursor: pointer;
`;
const Header = styled.h2`
  background: #f6f6f6;
  padding: 0.1rem;
  margin-top: -10px;
`;

const HeaderText = styled.h1`
  color: black;
  font-size: 30px;
  padding-top: 12px;
`;

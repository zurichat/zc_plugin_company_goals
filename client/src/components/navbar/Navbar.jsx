import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';

import { useState } from 'react';

import PropTypes from 'prop-types';

import search from '../../Images/search.svg';
import settings from '../../Images/settings.svg';

import SearchResults from '../searchBarDisplay/Search';
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
  AGbtn,
} from './navbar.styled';

import archive from './img/archive.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '15%',
    left: '33%',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <>
            <div>
              <AGbtn type="button" onClick={handleOpen}>
                Archive&nbsp;Goals
              </AGbtn>
              <Modal open={open} onClose={handleClose}>
                <div className={classes.paper}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                      <IconButton style={{ float: 'right', cursor: 'pointer' }} type="button" onClick={handleClose}>
                        <ClearIcon />
                      </IconButton>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img src={archive} alt="archive" />
                    </div>
                  </div>
                  <h2
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      margin: '1rem 0',
                      color: '#00B87C',
                    }}
                  >
                    Archive Goal?
                  </h2>
                  <p style={{ textAlign: 'center' }}>
                    Clicking the proceed button means that people will no longer have access to view this goal.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      marginTop: '1rem',
                      paddingLeft: '1.1rem',
                    }}
                  >
                    <MenuLink type="submit">Proceed</MenuLink>
                  </div>
                </div>
              </Modal>
            </div>
          </>
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

// export default Navbar;

// const Nav = styled.div`
//   padding: 1rem 0;
//   padding-right: 2rem;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   flex-wrap: wrap;
//   background: white;
// `;

// const Menu = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: relative;
// `;

// const MenuLink = styled.a`
//   background: ${(props) => (props.primary ? 'white' : '#00b87c')};
//   color: ${(props) => (props.primary ? '#00b87c' : 'white')};
//   padding: 10px 15px;
//   border: 2px solid #00b87c;
//   border-radius: 5px;
//   margin: 0 1rem;
//   height: 24px;
//   width: 110px;
//   cursor: pointer;
// `;

// const MenuLink1 = styled.a`
//   background: #00b87c;
//   color: white;
//   padding: 10px 15px;
//   border: 2px solid #00b87c;
//   border-radius: 5px;
//   margin: 0 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 24px;
//   width: 110px;
//   cursor: pointer;
// `;
// const SearchContainer = styled.div`
//   background: #f0f0f0;
//   width: 20%;
//   padding: 0 0 0 10px;
//   border-radius: 25px;
//   position: relative;
//   cursor: pointer;
// `;
// const AddIconStyled = styled(AddIcon)`
//   fontsize: 1.2rem;
//   marginright: 4px;
// `;
// const SearchInput = styled.input`
//   padding: 12px 10px;
//   outline: none;
//   border: none;
//   background: transparent;
//   color: #999999;
//   width: 80%;
//   margin-left: 20px;
//   font-size: 13px;
// `;

// const SearchIconStyled = styled(SearchIcon)`
//   color: #999999;
//   position: absolute;
//   top: 9px;
//   left: 15px;
//   cursor: pointer;
// `;

// const SettingsIconStyled = styled(SettingsIcon)`
//   color: #999999;
//   margin-left: 15px;
//   cursor: pointer;
// `;
// const Header = styled.h2`
//   background: #f6f6f6;
//   padding: 0.1rem;
//   margin-top: -10px;
// `;
Navbar.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;

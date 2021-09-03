import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <>
      <Header>
        <HeaderText>Company Goals</HeaderText>
      </Header>
      <Nav>
        <Menu>
          <MenuLink1>
            <AddIconStyled />
            NewGoal
          </MenuLink1>
          <MenuLink primary>Archived Goals</MenuLink>
        </Menu>
        <SearchContainer>
          <SearchIconStyled />
          <SearchInput type="text" placeholder="Search" />
        </SearchContainer>
        <SettingsIconStyled />
      </Nav>
    </>
  );
};

export default Navbar;

const Nav = styled.div`
  padding: 1rem 0;
  padding-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background: white;
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
  border-radius: 5px;
  min-width: 110px;
  cursor: pointer;
  padding: 10px 15px;
  margin-right: 1rem;
`;

const MenuLink1 = styled.a`
  background: #00b87c;
  color: white;
  padding: 10px 15px;
  border: 2px solid #00b87c;
  border-radius: 5px;
  margin: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 110px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  background: #f0f0f0;
  width: 20%;
  padding: 0 0 0 10px;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
`;
const AddIconStyled = styled(AddIcon)`
  font-size: 1.2rem;
  margin-right: 4px;
`;
const SearchInput = styled.input`
  padding: 12px 10px;
  outline: none;
  border: none;
  background: transparent;
  color: #999999;
  width: 80%;
  margin-left: 20px;
  font-size: 13px;
`;

const SearchIconStyled = styled(SearchIcon)`
  color: #999999;
  position: absolute;
  top: 9px;
  left: 15px;
  cursor: pointer;
`;

const SettingsIconStyled = styled(SettingsIcon)`
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

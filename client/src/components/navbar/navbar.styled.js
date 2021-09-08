import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

export const Nav = styled.div`
  padding: 0.5rem 0;
  padding-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background: #e5e5e5;
  height: 80px;
`;

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const MenuLink = styled.a`
  background: ${(props) => (props.primary ? 'white' : '#00b87c')};
  color: ${(props) => (props.primary ? '#00b87c' : 'white')};
  border: 2px solid #00b87c;
  border-radius: 3px;
  /* min-width: 110px; */
  cursor: pointer;
  padding: 6px 14px;
  margin-right: 19px;
`;

export const MenuLink1 = styled.a`
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
export const SearchContainer = styled.div`
  background: #f0f0f0;
  width: 24.375rem;
  padding: 0 0 0 10px;
  border-radius: 3px;
  position: relative;
  cursor: text;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const AddIconStyled = styled(AddIcon)`
  font-size: 1.2rem;
  margin-right: 4px;
`;
export const SearchInput = styled.input`
  padding: 12px 10px 13px;
  outline: none;
  border: none;
  background: transparent;
  color: black;
  width: 80%;
  margin-left: 35px;
  font-size: 13px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const SearchIconStyled = styled.img`
  position: absolute;
  top: 10.5px;
  left: 22.5px;
  padding-right: 11.75px;
  cursor: pointer;
`;

export const SettingsIconStyled = styled.img`
  color: #999999;
  margin-left: 15px;
  cursor: pointer;
`;

export const ProfileImageContainer = styled.div`
  margin-left: 1rem;
`;
export const Header = styled.div`
  background: #00b87c;
  padding: 0.1rem;
  /* margin-top: -10px; this made the company goal overlap */
  height: 81px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const HeaderText = styled.h1`
  color: white;
  font-size: 30px;
  width: 100%;
  margin-left: 1rem;
`;

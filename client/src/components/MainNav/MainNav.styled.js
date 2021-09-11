import styled from 'styled-components';

export const Search = styled.input`
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.4);
  border: 0.8px solid rgba(153, 153, 153, 0.2);
  height: 32px;
  padding: 1rem 0.5rem;
  outline: none;
  width: 392px;
`;
export const SettingsIconStyled = styled.img`
  color: #999999;
  margin: 0px 1.4rem;
  cursor: pointer;
`;
export const SearchIconStyled = styled.img`
  cursor: pointer;
`;
export const MobileIconStyled = styled.img`
  cursor: pointer;
  width: 18px;
  height: 18px;
  @media (min-width: 400px) {
    display: none;
  }
`;

export const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #acffe6;
  @media (max-width: 400px) {
    width: 23.4px;
    height: 23.4px;
    display: inline-block;
    object-fit: cover;
  }
`;
export const MobileAvatarContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #acffe6;
  @media (min-width: 400px) {
    display: none;
  }
`;

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  @media (max-width: 400px) {
    display: none;
  }
`;
export const Header = styled.div`
  width: 100%;
  height: 81px;
  background: #00b87c;
  border-radius: 3px;
  margin: 2rem 0px;
  padding: 1.9rem 1.25rem;

  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr;
    align-items: center;
    padding: 1.25rem;
    place-items: center;
    border-radius: 0px;
  }
  @media (max-width: 330px) {
    grid-template-columns: 1fr 4fr 1fr 1fr;
  }
`;
export const Text = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 1.32rem;
  line-height: 1.32rem;
  color: #ffffff;
  @media (max-width: 400px) {
    justify-self: left;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1rem;
  }
`;

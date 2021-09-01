import styled from 'styled-components';

const AppHeader = () => {
  return (
    <Header>
      <HeaderText>Company Plugins</HeaderText>
    </Header>
  );
};

export default AppHeader;

const Header = styled.h2`
  background: #f6f6f6;
`;

const HeaderText = styled.h1`
  color: black;
  font-size: 30px;
  margin-left: 1rem;
`;

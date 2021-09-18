import styled from 'styled-components';

const NavName = styled.div`
  color: #999999;
  font-family: Lato;
  font-weight: 400;
  text-transform: capitalize;
  padding: 0.43rem 1rem 0.73rem;
  cursor: pointer;
  white-space: nowrap;

  &.active {
    color: #00b87c;
    font-weight: 700;
    border-bottom: 1.5px solid #00b87c;
  }
`;

export default NavName;

import styled from 'styled-components';

const NavName = styled.div`
  height: 28px;
  color: #999999;
  font-family: Lato;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 28px;
  padding: 0rem 1rem;
  padding-bottom: 0.5rem;
  cursor: pointer;

  &.active {
    color: #00b87c;
    font-weight: 700;
    border-bottom: 1.5px solid #00b87c;
  }
`;

export default NavName;

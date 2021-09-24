import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const NavName = styled.div`
  color: #999999;
  font-family: Lato;
  font-weight: 400;
  font-size: 1rem;
  text-transform: capitalize;
  margin-right: 1rem;
  padding: 0.43rem 1rem 0.73rem;
  cursor: pointer;
  white-space: nowrap;
  display: inline;
  &.active {
    color: #00b87c;
    font-weight: 700;
    border-bottom: 1.5px solid #00b87c;
  }
`;

const CreateGoalButton = styled(Button)`
  background-color: #00b87c;
  text-transform: capitalize;
  color: #fff;
  padding: 10px 14px 10px 14px;
  margin-bottom: 0.4rem;
  &:hover {
    background-color: #00b87c;
  }
`;

export { NavName, CreateGoalButton };

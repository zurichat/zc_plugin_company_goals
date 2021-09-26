import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.main`
  background-color: #00b87c;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const HomeText = styled(Typography)`
  color: #fff;
  font-size: 2rem;
  text-transform: capitalize;
`;

export const HomeLink = styled(Link)`
  text-transform: capitalize;
  color: #fff;
  text-decoration: none;
  font-size: 1.13rem;
`;

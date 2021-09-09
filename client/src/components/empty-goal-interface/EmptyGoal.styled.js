import Button from '@material-ui/core/Button';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const EmptyGoalContainer = styled.div`
  /* align-self: center; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;
`;

export const EmptyImgContainer = styled.div`
  height: 169px;
  width: 169px;
`;

export const EmptyGoalText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #999999;
  height: 19px;
  width: 342px;
  margin-bottom: 53px;
  margin-top: 41px;
`;
export const EmptyGoalButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 64px;
  color: white;
  background: #00b87c;
  border-radius: 6px;
  margin-bottom: 125px;
  cursor: pointer;
`;

import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const EmptyGoalContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

export const EmptyGoalText = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #616061;
  height: 19px;
  width: 342px;
  margin-bottom: 24px;
  margin-top: 187px;
`;
export const EmptyGoalButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
  color: white;
  background: #00b87c;
  border-radius: 3px;
  margin-bottom: 234px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  font-family: 'Lato';
  font-style: normal;
    &:hover {
  opacity: 0.8;
  }
`;

import styled from 'styled-components';

export const GoalContainer = styled.div`
  width: 70%;
  margin-top: 2rem;
`;
export const GoalContainer1 = styled.div`
  width: 30%;
  margin-top: 6rem;
`;
export const MainContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  height: 50%;
`;
export const Goal = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 200px;
  background: red;
  height: 100vh;
  background: ${(props) => (props.primary ? 'white' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  margin: 10px;
  box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.5);
`;
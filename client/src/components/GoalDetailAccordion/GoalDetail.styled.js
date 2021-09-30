import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 300px;
`;

export const Text = styled.h4`
  margin: 0 10px;
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => (props.primary ? '#393939' : '#8D8D8D')};
  text-transform: capitalize;
  text-align: ${(props) => (props.primary ? 'left' : 'right')};
`;

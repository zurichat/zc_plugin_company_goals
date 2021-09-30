import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 250px;
`;

export const Text = styled.h4`
  margin: 0 10px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => (props.primary ? '#393939' : '#8D8D8D')};
  text-transform: capitalize;
  text-align: ${(props) => (props.primary ? 'left' : 'right')};
`;

export const Button = styled.button`
  background: #00b87c;
  color: #ffffff;
  line-height: 24px;
  font-size: 15px;
  border-radius: 3px;
  padding: 1rem;
  outline: 0;
  border: 0;

  @media screen and (max-width: 500px) {
    padding: 0.5rem;
  }
  &::disabled {
    background: rgba(0, 184, 112, 0.48);
  }
`;
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
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => (props.primary ? '#393939' : '#8D8D8D')};
  text-transform: capitalize;
  text-align: ${(props) => (props.primary ? 'left' : 'right')};
`;

export const Button = styled.button`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  margin-left: ${(props) => props.marginLeft};
  border-radius: 3px;
  font-family: lato;
  font-weight: normal;
  margin-top: ${(props) => props.marginTop};
  padding: ${(props) => props.padding};
  outline: 0;
  border: 0;

  @media screen and (max-width: 500px) {
    padding: 0.5rem;
  }
  &::disabled {
    background: rgba(0, 184, 112, 0.48);
  }
`;

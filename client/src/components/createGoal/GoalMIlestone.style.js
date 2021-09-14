import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Div = styled.div`
  display: block;
`;
export const Input = styled.input`
  box-sizing: border-box;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: white;
  border: 1px solid grey;
  outline: none;
  display: none;
  width: 12%;
  cursor: pointer;
  position: relative;
  margin-bottom: -1.5rem;
  &:before {
    bottom: 70%;
    width: 13% !important;
    position: absolute;
    content: '1';
    padding: 0.4rem 0;
    text-align: center;
    display: inline;
    border: 0.5px solid #393939;
    padding: 0.85rem 0;
    border-radius: 3px;
    color: #393939;
  }
`;
export const Label = styled.label`
  color: #dadada;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  justify-content: inherit;
  margin-bottom: 0.5rem;
`;

export const Title = styled.div`
  width: 13% !important;
  text-align: center;
  border: 0.5px solid #393939;
  padding: 0.95rem 0;
  border-radius: 3px;
  color: #393939;
  h5 {
    font-size: 24px;
  }
`;
export const Body = styled.div`
  border: 0.5px solid #393939;
  width: 87%;
  border-radius: 3px 3px 3px 0;
  padding: 0.85rem 0;
  text-align: start;
  p {
    color: #8c8c8c;
  }
`;

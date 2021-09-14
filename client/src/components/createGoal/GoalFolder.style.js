import styled from 'styled-components';

export const RadioLabel = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 0.2rem;
`;
export const LabelTitle = styled.h6`
  font-size: 16px;
  color: #393939;
  width: 100%;
  margin: 0 auto;
`;

export const Label = styled.label`
  display: block;
  width: 5.2rem;
  text-align: center;
  margin-top: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  &:before {
    content: ' ';
    display: inline-block;
    position: relative;
    top: -0.18rem;
    left: 0.38rem;
    margin: 0 8px 1px 0;
    width: 10px;
    height: 10px;
    border-radius: 11px;

    background-color: transparent;
  }
`;
export const Input = styled.input`
  box-sizing: border-box;
  appearance: none;
  background: white;

  border: 1px solid grey;
  outline: none;
  width: 15px;
  height: 15px;
  cursor: pointer;
  position: relative;
  display: flex;
  margin-left: 2.25rem;
  margin-bottom: -2.5rem;
  border-radius: 50%;
  &:checked {
    border: 1px solid #00b87c;
  }
  &:checked + ${Label} {
    border: 1px solid #00b87c;
    border-radius: 5px;
  }
  &:checked + ${Label}:before {
    background-color: #00b87c;
    border: 0.5px solid #00b87c;
    padding: 0.1rem;
  }
`;

export const FolderDiv = styled.div`
  padding-top: 1rem;
  @media only screen and (max-width: 600px) {
    ${Label}:before {
      left: 0.5rem !important;
    }
  }
`;

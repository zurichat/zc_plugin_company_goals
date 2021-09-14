import styled from 'styled-components';

export const PriorityContainer = styled.div`
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  height: 52px;
  padding-left: 1rem;
`;
export const PriorityLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0.4rem;
`;
export const PrioritySpan = styled.span`
  margin-right: 1rem;
  color: grey;
  width: 50%;
  text-align: end;
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
  width: 12px;
  height: 12px;
  cursor: pointer;
  position: relative;
  margin-bottom: -1.5rem;

  &:checked {
    border: 1px solid #00b87c;
  }
  &:checked:before {
    content: '✓';
    background: white;
    color: #00b87c;
    font-size: 1rem;
    position: absolute;
    display: flex;
    width: 80%;
    height: 80%;
    margin-bottom: 1rem;
    right: -10%;
    top: -90%;
    border-radius: 100%;
  }
  &:checked + ${PriorityLabel} {
    ${PrioritySpan} {
      color: black;
    }
  }
`;

export const PriorityDiv = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  &:active + ${PrioritySpan} {
    color: black;
  }
`;

import styled from 'styled-components';

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const InputLabel = styled.input`
    font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  margin-top: 0.5rem;
  padding: 20px;
  height: 3rem;
  border: none;
  outline: none;
  border: 1px solid #00b87c;
  border-radius: 3px;
  background-color: #ffffff;
  color: #00b87c;
  width: 15%;
`;

export const InputTarget = styled.div`
    font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  height: 3rem;
  border: none;
  outline: none;
  border: 1px solid #a1a1a1;
  background-color: #ffffff;
  width: 20%;
`;

export const AddContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

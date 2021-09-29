import styled from 'styled-components';

export const Header = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.75rem;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

export const TextBox = styled.textarea`
  display: block;
  height: 13rem;
  margin: 2.1875rem auto;
  font-family: Lato;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: white;
  padding: 0.625rem;
  resize: none;
  width: 100%;
  box-sizing: border-box;
`;

export const SaveBtn = styled.button`
  border: none;
  background-color: rgba(0, 184, 124, 1);
  color: white;
  padding: 0.5rem 2.8438rem;
  border-radius: 0.375rem;
  cursor: pointer;
  float: right;
  margin-right: 0.3125rem;
`;

export const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Lato;
  width: 100vw;
`;

export const Paper = styled.div`
  background-color: #f6f6f6;
  border: none;
  border-radius: 0rem;
  padding: 2.1875rem;
  font-family: Lato;
  width: 45rem;
  max-width: 100%;
  margin: 1rem;
  box-sizing: border-box;
`;

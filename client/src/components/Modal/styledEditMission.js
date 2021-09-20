import styled from 'styled-components';

export const Header = styled.h2`
  text-align: center;
  font-size: 24px;
  line-height: 28px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

export const TextBox = styled.textarea`
  border: 1px solid red;
  display: block;
  height: 208px;
  margin: 35px auto;
  font-family: Lato;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: white;
  padding: 10px;
  resize: none;
  width: 100%;
  box-sizing: border-box;
`;

export const SaveBtn = styled.button`
  border: none;
  background-color: rgba(0, 184, 124, 1);
  color: white;
  padding: 15px 30px;
  border-radius: 6px;
  cursor: pointer;
  float: right;
  margin-right: 5px;

  @media only screen and (max-width: 700px) {
    width: 50%;
    height: auto;
    padding: 10px 30px;
  }
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
  border-radius: 5px;
  padding: 35px;
  font-family: Lato;
  width: 720px;
  height: 430px;
  max-width: 100%;
  margin: 1rem;
  box-sizing: border-box;

  @media only screen and (max-width: 700px) {
    width: 80vw;
    height: 60vh;
    margin: 1rem;
    padding: 15px 15px;
  }
`;

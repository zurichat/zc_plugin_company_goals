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
  backgroundcolor: white;
  padding: 10px;
  resize: none;
  ${'' /* width: 650px; */}
  width: 100%;
  box-sizing: border-box;
`;

export const SaveBtn = styled.button`
  border: none;
  background-color: rgba(0, 184, 124, 1);
  color: white;
  width: 120px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  float: right;
  margin-right: 5px;
`;

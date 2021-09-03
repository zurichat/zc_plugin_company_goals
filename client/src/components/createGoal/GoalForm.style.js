import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #ffffff; 
}
::-webkit-scrollbar-thumb {
  background: #C9C9C9; 
  border-radius: 10px;
}
`;
export const ScrollContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  &::-webkit-scrollbar {
    width: 10px;
    border: 1px solid black;
  }
`;
export const Goal = styled.div`
  padding: 1.5rem;
  margin: 0 auto;
  width: 85%;
`;
export const Form = styled.form`
  background-color: #fff;
  width: 100%;

  div {
    width: 100%;
  }
`;
export const Container = styled.div`
  display: flex;
`;
export const Icon = styled.div`
  width: 40px !important;
  height: 40px !important;
  margin: 1.5rem 0.8rem 0 0;
  background: #e3eeff;
  text-align: center;
  border-radius: 50%;
`;

export const Title = styled.h5`
  margin-bottom: 0;
  font-family: Lato;
  font-weight: Bold;
  font-size: 21px;
  color: ${(props) => props.titleColor};
`;

export const Info = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;

  color: ${(props) => props.textColor};
`;
export const Input = styled.input`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  margin-top: 2rem;
  border: none;
  outline: none;
  color: #999999;
  border-bottom: 0.5px solid #00b87c;
  width: 100%;
`;

export const Button = styled.button`
  background-color: #00b87c;
  border: none;
  border-radius: ${(props) => props.borderRadius};
  color: #fff;
  outline: none;
  padding: ${(props) => props.buttonPadding};
  font-size: 12px;
`;

export const AccessButton = styled.button`
  display: inline-block;
  outline: none;
  border: ${(props) => props.borderDetails};
  border-radius: 8px;
  height: 8.5625rem;
  padding: 1rem 0;
  width: 12.625rem;
  margin-right: 5rem;
  background-color: #fff;
  color: #999999;
`;
export const CreateButton = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
export const Box = styled.div`
  margin-top: 2rem;
  width: 20% !important;
  display: flex;
  float: right;
  align-items: center;
  justify-content: space-between;
`;
export const CloseButton = styled.button`
  outline: none;
  border: none;
  float: right;
  background: none;
  font-weight: bold;
  font-size: 1rem;
  color: #333333;
  cursor: pointer;
`;
export const FaderInput = styled.input`
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid black;
  }
`;

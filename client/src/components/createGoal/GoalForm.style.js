import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #F6F6F6;
}
::-webkit-scrollbar-thumb {
  background: #C9C9C9; 
  border-radius: 10px;
}

`;
export const Goal = styled.div`
  font-family: Lato;
  padding: 1.5rem 3rem;

  width: 100%;
  background-color: #f6f6f6;

  @media only screen and (max-width: 600px) {
    width: 100% !important;
    padding: 1rem !important;
  }
`;
export const Form = styled.form`
  width: 100%;
  margin: 1.5rem 0;

  div {
    width: 100%;
  }
`;
export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 5rem;
`;
export const Icon = styled.div`
  width: 40px !important;
  height: 40px !important;

  margin-right: 0.8rem;
  background: #e3eeff;
  text-align: center;
  border-radius: 50%;
`;

export const Title = styled.h5`
  margin-bottom: 0;

  font-weight: Bold;
  font-size: 21px;
  color: ${(props) => props.titleColor};
`;

export const Info = styled.p`
  font-family: Lato;
  margin-top: 0.3rem;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;

  color: ${(props) => props.textColor};
`;
export const Input = styled.input`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  margin-top: 0.5rem;
  padding: 0.5rem;
  height: 3rem;
  border: none;
  outline: none;
  border: 1px solid #393939;
  background-color: #ffffff;
  width: 100%;
  &:focus {
    border: 0.5px solid #00b87c;
  }
`;

export const TextArea = styled.textarea`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  margin: 0 auto;
  font-size: 22px;
  width: 99% !important;
  outline: none;
  padding: 0.5rem;
  resize: none;
  border: 1px solid #393939;
  background-color: #ffffff;
  &:focus {
    border: 0.5px solid #00b87c;
  }
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

export const CreateButton = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
export const Box = styled.div`
  margin-top: 2rem;
  width: 25% !important;
  display: flex;
  float: right;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 400px) {
    width: 50% !important;
  }
`;
export const TargetContainerA = styled.div`
  width: 100% !important;

  display: flex;
  justify-content: space-between;
  /* @media only screen and (max-width: 500px) {
    flex-wrap: wrap !important;
  } */
`;
export const TargetContainerB = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 500px) {
    flex-wrap: wrap !important;
    input {
      width: 90% !important;
    }
  }
`;
export const TargetInput = styled.input`
  width: 100%;
  height: 33px;
  font-size: 22px;
  padding-left: 0.2rem;
  color: #000000;
  border: 0.5px solid #393939;
  outline: none;
  border-radius: 3px;
  height: 3rem;
  &:focus {
    border: 0.5px solid #00b87c;
  }
`;

export const PriorityContainer = styled.div`
  margin-top: 2rem;
  width: 80%;
  border-radius: 0px 0px 3px 3px; ;
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

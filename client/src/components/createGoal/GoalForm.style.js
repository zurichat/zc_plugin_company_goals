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
export const Goal = styled.div`
  font-family: Lato;
  padding: 1.5rem;
  margin: 2rem auto;
  width: 85%;

  @media only screen and (max-width: 500px) {
    width: 100% !important;
    padding: 1rem 0.5rem !important;
  }
`;
export const Form = styled.form`
  background-color: #fff;
  width: 95%;
  margin: 1.5rem auto;

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
export const AccessDiv = styled.div`
  width: 60% !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const AccessButton = styled.button`
  display: inline-block;
  outline: none;
  border: ${(props) => props.borderDetails};
  border-radius: 8px;
  height: 8.5625rem;
  padding: 1rem 0;
  margin-bottom: 1rem;
  width: 10.625rem;
  background-color: #fff;
  color: #999999;

  @media only screen and(max-width: 500px) {
    width: 7rem !important;
    font-size: 18px !important;
  }
`;
export const AccessText = styled.h6`
  margin-bottom: 0;
  font-family: Lato;
  font-weight: Bold;
  font-size: 21px;
  color: ${(props) => props.titleColor};

  @media only screen and(max-width: 500px) {
    font-size: 12px !important;
  }
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
  width: 65% !important;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  /* @media only screen and (max-width: 500px) {
    flex-wrap: wrap !important;
  } */
`;
export const TargetContainerB = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: spaces-between;
  @media only screen and (max-width: 500px) {
    flex-wrap: wrap !important;
    input {
      width: 90% !important;
    }
  }
  @media only screen and (max-width: 840px) {
    flex-wrap: wrap !important;
    input {
      width: 90% !important;
    }
  }
`;
export const TargetInput = styled.input`
  width: 280px;
  height: 33px;
  color: #999999;
  border: 0.5px solid #999999;
  border-radius: 3px;

  &:focus {
    outline: #999999;
  }
`;

export const PriorityContainer = styled.div`
  border-top: 2px solid #00b87c;
  margin-top: 2rem;
`;
export const PriorityDiv = styled.div`
  background-color: #f6f6f6;
  margin-bottom: 0.5rem;
  height: 52px;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PrioritySpan = styled.span`
  margin-right: 1rem;

  img {
    margin-left: 1rem;
  }
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

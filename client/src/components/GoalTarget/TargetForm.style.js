import styled from 'styled-components';

export const Goal = styled.div`
  font-family: Lato;
  padding: 0 1rem 1rem 2rem;

  width: 100%;
  background-color: #fff;

  /* @media only screen and (max-width: 600px) {
    width: 100% !important;
    padding: 0.8rem !important;
  } */
`;
export const Form = styled.form`
  width: 100%;
  margin: 0 0 1.5rem 0;
  div {
    width: 100%;
  }
`;
export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const MainTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: Bold;
  font-size: 28px;
  color: #1d1c1d;
`;
export const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
export const Title = styled.h5`
  margin-bottom: 0;
  margin-right: 0.2rem;
  font-weight: Bold;
  font-size: 15px;
  color: #1d1c1d;
`;

export const Info = styled.p`
  font-family: Lato;
  margin-top: 0.3rem;
  font-style: normal;
  font-weight: normal;
  font-size: ${(props) => props.fontSize};
  color: #999999;
`;
export const Input = styled.input`
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
  width: 100%;
`;
export const SelectDiv = styled.div`
  width: 45% !important;
  margin-top: 1rem;
`;
export const Select = styled.select`
  width: 100%;
  height: 50px;
  background-color: #00b87c;
  border-radius: 3px;
  color: #fff;
  padding: 0 0.7rem;
  border: none;
  outline: none;
  option {
    color: #b0afb0;
    font-size: 13px;
    margin: 5rem 0 1rem 0.5rem;
    background-color: #fff;
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
  width: 85% !important;
  float: right;
  display: flex;
  justify-content: space-between;
  /* @media only screen and (max-width: 500px) {
    flex-wrap: wrap !important;
  } */
`;
export const TargetContainerB = styled.div`
  display: flex;
  margin-top: 0.7rem;
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
  font-size: 15px;
  padding-left: 0.2rem;
  color: #000000;
  border: 0.5px solid #a1a1a1;
  outline: none;
  border-radius: 3px;
  height: 3rem;
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
  font-size: 1.5rem;
  color: #333333;
  cursor: pointer;
`;

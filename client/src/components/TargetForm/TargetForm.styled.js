import styled from 'styled-components';

export const Text = styled.p`
  font-size: 13px;
  font-style: normal;
  line-height: 130%;
  font-weight: normal;
  color: #616061;
  margin: 1rem 0 2rem 0;
  text-align: start;
`;

export const Close = styled.p`
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;
`;

export const Overlay = styled.div`
  background: #00000014;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
display: flex;
justify-content: space-between; 
align-items:center;
`;

export const TextHeader = styled.h4`
font-size: 28px;
line-height: 34px;
color: #1D1C1D;
@media screen and (max-width: 500px){
  font-size: 20px;
}
`;

export const TargetFormContainer = styled.div`
  font-family: Lato;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #E7E7E7;
  box-shadow: 1px 1px 44px rgba(64, 64, 64, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
  z-index: 20;
  padding: 2rem;
  padding-bottom: 4rem;
  &>*{
    width: 100%;
  }
  @media screen and (max-width: 850px){
    width: 65%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media screen and (max-width: 500px){
    font-size: .7rem;
    width: 90%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  &>*{
    &:not(:first-of-type){
      margin-top: 1.4rem;
    }    
  }
`

export const FormHeader = styled.h6`
  color: #1D1C1D;
  display: flex;
  align-items: center;
  font-style: normal;
  font-size: 15px;
  line-height: 130%;
`;

export const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  display: none;
  &:checked ~ Label {
    color: #00b87c;
    & > div {
      border: 1px solid #00b87c;
      &::after{
        background: #00b87c;
      }
    }
  }
`;

export const NewRadio = styled.div`
  border: 1px solid #b0afb0;
  border-radius: 50%;  
  background: #ffffff;
  position: relative;
  transition: 0.2s background;
  width: 12px;
  height: 12px;

  &::after {
    content: "";
    position: absolute;
    width: 70%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    
    border-radius: 50%;
  }
`;

export const Label = styled.label`
  color: #b0afb0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 16px;
  font-size: 13px;
  font-weight: 500;
  font-style: normal;  
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RadioContainer = styled.div`
  display: flex;
  justify-content:space-around;
  align-items: center;
`;

export const MileStoneContainer = styled.div`
  margin-top: 2.5rem;
`;

export const MileStone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const MileStoneSecondary = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
`;

export const MileStoneNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00b87c;
  width: 20%;
  color: #000;
  margin-right: 1.5rem;
  padding: 1.4rem 1rem;
  height: 24px;
  box-sizing: border-box;
  font-size: 1.4rem;
  color: #00b87c;
  @media screen and (max-width: 500px) {
    height: 17px;
    padding: .9rem .5rem;
    font-size: .9rem;
  }
`;

export const MileStoneInput = styled.input.attrs({
  type: 'text',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00b87c;
  width: 80%;  
  padding: 1.4rem 1rem;
  height: 24px;
  box-sizing: border-box;
  outline: 0;
  @media screen and (max-width: 500px){
  height: 17px;
  padding: .9rem .5rem;
}
  &:placeholder{
    color: #eee;
    font-size: .7rem;
  }
`;

export const AddMileStoneButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00b87c;
  color: #00b87c;
  margin-right: 0.5rem;
  border-radius: 50%;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  /* padding: 4px; */
  cursor: pointer;  
`;

export const AddMileStoneText = styled.p`
  color: #00b87c;
  font-size: 15px;
  line-height: 18px;
  font-weight: normal;
  font-style: normal;
  @media screen and (max-width: 500px) {
    font-size: 12px;
    line-height: 14px;
  }
`;

export const Button = styled.button`
  background: #00b87c;
  color: #ffffff;
  line-height: 24px;
  font-size: 15px;
  border-radius: 3px;
  padding: 1rem;
  outline: 0;
  border: 0;

  @media screen and (max-width: 500px) {
    padding: .5rem;
  }
  &::disabled {
    background: rgba(0, 184, 112, 0.48);
  }
`;
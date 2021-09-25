import styled from 'styled-components';

export const VisionContainer = styled.div `
  position: relative;
  max-width: 100%;
  margin: auto;
`
export const Box = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
// export const Input = styled.input`
//   background-color: ${(props) => props.bgColor};
//   padding: ${(props) => props.padding};
//   margin: ${(props) => props.margin};
//   width: 100%;
//   height: 15%;
//   border: none;

//   @media only screen and (max-width: 420px) {
//     width: 340px;
//     height: 45px;
    
//   }
//   &::placeholder {
//     font-size: 18px;
//     font-family: 'Lato';
//     padding-left: 10px;
//     color: #999999;
//   }
// `;
export const Editbutton = styled.button`
  border: none;
  position: absolute;
  background-color: transparent;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  cursor: pointer;

  @media only screen and (max-width: 420px) {
    right: ${(props) => props.rsRight};
  }
`;
export const Title = styled.h3`
  position: absolute;
  font-family: 'Lato';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  color: ${(props) => props.color};

  @media only screen and (max-width: 420px) {
    top: ${(props) => props.rsTop};
    right: ${(props) => props.rsRight};
  }
`;
export const VisionField = styled.p`
  width: 40vw;
  border: none;
  background-color: white;
  padding: 21px 15px;
  &:-ms-keyboard-active {
    border-style: none;
  }
  @media only screen and (max-width: 720px) {
    width: 80vw;
    padding: 10px 15px;
  }
`;

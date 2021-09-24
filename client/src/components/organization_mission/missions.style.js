import styled from 'styled-components'

export const MissionContainer = styled.div `
  position: relative;
  max-width: 100%;
  margin: auto;
`
export const Box = styled.div`
   position: relative;
   padding: 10px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`
// export const Input = styled.input `
//    background-color: ${(props) => props.bgColor};
//    padding: ${(props) => props.padding};
//    margin: ${(props) => props.margin};
//    width: 40vw;
//    height: 61px;
//    border: none;

//    &::placeholder {
//       font-size: 18px;
//       font-family: 'Lato';
//       padding-left: 10px;
//       color: #999999;
//    }
//    &:-ms-keyboard-active {
//       border-style: none;
//    }
//    @media only screen and (max-width: 720px){
//       width: 70vw;
//       height: 45px;
//    }
// `
export const Editbutton = styled.button `
   border: none;
   position: absolute;
   background-color: transparent;
   top: ${(props) => props.top};
   left: ${(props) => props.left};
   cursor: pointer;

   @media only screen and (max-width: 720px){
      left: ${(props) => props.rsLeft};
   }
`
export const CollapseButton = styled.button `
   width: 60px;
   height: 48px;
   color: #fff;
   border: none;
   background: ${(props) => props.bgColor};
   cursor: pointer;
`
export const Title = styled.h3 `
   position: absolute;
   font-family: 'Lato';
   font-style: normal;
   font-weight: bold;
   font-size: 20px;
   line-height: 20px;
   top: ${(props) => props.top};
   left: ${(props) => props.left};
   color: ${(props) => props.color};

   @media only screen and (max-width: 720px){
      top: ${(props) => props.rsTop};
      left: ${(props) => props.rsLeft};
   }
`

export const MissionField = styled.p`
  width: 40vw;
  border: none;
  background-color: white;
  padding: 21px 15px;
  &:-ms-keyboard-active {
    border-style: none;
  }
  @media only screen and (max-width: 720px) {
    width: 78vw;
    height: 35px;
    padding: 10px 15px;
  }
`;

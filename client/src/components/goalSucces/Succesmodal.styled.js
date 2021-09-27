import styled from 'styled-components'


export const ModalBg = styled.div `
   position: fixed;
  display: ${(props) => (props.show ? 'block' : 'none')};
  /* display: block; */
  width: 100%;
  height: 600vh;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  z-index: 1;
`
export const Modal = styled.div` 
   width: 30.31rem;
   height: 31.75rem;
   margin: 5rem auto;
   padding-top: 1.5rem;
   background: #ffffff;
   border-radius: 5px;
   z-index: 1;

  @media screen and (max-width: 450px) {
    width: 87.2%;
    height: 23rem;
    padding-top: 0.3rem;
 }
`
export const Imgdiv = styled.div `
   background: #00B87C;
   width: 30%;
   height: 30%;
   border-radius: 50%;
   margin: auto;
   @media screen and (max-width: 450px) {
    width: 25%;
   height: 25%;
   }
`
export const Image = styled.img`
display: flex;
justify-content: center;
align-items: center;
  margin: auto;
  padding: 1.7rem 1rem;
 width: 100px;
  @media screen and (max-width: 450px) {
    padding: 1rem;
    width: 80px;
  }
`;
export const SuccessContent = styled.div`
  text-align: center;
  padding-top: 3rem;
  @media screen and (max-width: 450px) {
    padding-top: 1rem;
  }
`;
export const SuccessHead = styled.h2 `
   font-family: 'Lato', sans-serif;
  text-align: center;
  margin-bottom: 1rem;
  color: #242424;
  @media screen and (max-width: 450px) {
    font-size: 1em;
  }
`
export const SuccessInfo = styled.p `
   font-size: 12px;
   line-height: 163.42%;
   width: 63.3%;
   color: #393939;
   margin: 0 auto;
   font-family: 'Lato', sans-serif;
  
  @media screen and (max-width: 450px) {
    font-size: 10px;
  }
`
export const SuccessButton = styled.button `
   background: #00b87c;
   padding: 12px 16px;
   margin-top: 2.54rem;
   border: none;
   border-radius: 3px;
   font-family: 'Lato', sans-serif;
   color: #ffffff;
   width: 10rem;
   height: 2.4rem;
   z-index: 3;
`
export const XBtn = styled.button`
  display: block;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0 1.5rem;
  margin-left: auto;
  font-size: 1.1rem;

  @media screen and (max-width: 450px) {
    padding: 0.7rem;
  }
`;
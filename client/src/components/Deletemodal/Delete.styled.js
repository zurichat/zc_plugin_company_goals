import styled from "styled-components";

export const FadedBg = styled.div `
   position: absolute;
  display: none;
  justify-content: center;
  width: 100%;
  height: 200vh;
  left: 0;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  z-index: 1;
`;
export const DeleteModal = styled.div `
   width: 485px;
  height: 508px;
  margin-top: 5rem;
  background: #ffffff;
  border-radius: 5px;
  z-index: 1;
`;
export const DeleteContent = styled.div `
   text-align: center;
   padding-top: 3rem;
`;
export const DeleteHead = styled.h2 `
   font-family: 'Lato', sans-serif;
   text-align: center;
   margin-bottom: 1rem;
   color: #29429a;
`;
export const DeleteInfo = styled.p `
   font-size: 12px;
   line-height: 163.42%;
   width: 300px;
   color: #000;
   margin: 0 auto;
   font-family: 'Lato', sans-serif;
`;
export const DelButton = styled.button `
   background: #00b87c;
   padding: 12px 16px;
   margin-top: 2rem;
   border: none;
   border-radius: 3px;
   font-family: 'Lato', sans-serif;
   color: #ffffff;
   width: 10rem;
   height: 2.4rem;
   z-index: 3;
`;
export const XBtn = styled.button `
   border: none;
   background: transparent;
   cursor: pointer;
   padding: 2rem;
   margin-left: 25rem;
   font-size: 1.1rem;
`;
export const MainDelBtn = styled.button `
   margin-top: 1rem;
   background: #00b87c;
   padding: 12px 16px;
   border-radius: 3px;
   font-family: 'Lato', sans-serif;
   color: #ffffff;
   border: none;
   margin: auto;
   font-family: 'Lato', sans-serif;
`;
export const Images = styled.div `
   display: flex;
   justify-content: center;
`
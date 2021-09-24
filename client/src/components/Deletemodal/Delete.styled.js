import styled from 'styled-components';

export const FadedBg = styled.div`
  position: fixed;
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: 100%;
  height: 600vh;
  left: 0;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  z-index: 1;
`;
export const DeleteModal = styled.div`
  width: 30.31rem;
  height: 31.75rem;
  margin: 5rem auto 0;
  background: #ffffff;
  border-radius: 5px;
  z-index: 1;
  @media screen and (max-width: 450px) {
    width: 87.2%;
    height: 23rem;
  }
`;
export const DeleteContent = styled.div`
  text-align: center;
  padding-top: 3rem;
  @media screen and (max-width: 450px) {
    padding-top: 2rem;
  }
`;
export const DeleteHead = styled.h2`
  font-family: 'Lato', sans-serif;
  text-align: center;
  margin-bottom: 1rem;
  color: #242424;
  @media screen and (max-width: 450px) {
    font-size: 1em;
  }
`;
export const DeleteInfo = styled.p`
  font-size: 12px;
  line-height: 163.42%;
  width: 63.3%;
  color: #393939;
  margin: 0 auto;
  font-family: 'Lato', sans-serif;
  @media screen and (max-width: 450px) {
    font-size: 10px;
  }
`;
export const DelButton = styled.button`
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
`;
export const XBtn = styled.button`
  display: block;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 2rem;
  margin-left: auto;
  font-size: 1.1rem;
  @media screen and (max-width: 450px) {
    padding: 1.1rem;
  }
`;
export const Images = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 450px) {
    img {
      width: 70px;
    }
  }
`;

import styled from 'styled-components';


export const ParentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  width: 49%;

  @media only screen and (max-width: 760px) {
    width: 98%;
  }
  @media only screen and (max-width: 425px) {
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Editbutton = styled.button`
  border: none;
  background-color: #ffffff;
  padding: 21px 22px 22px;
  cursor: pointer;
  border-top: 2px solid #eee3e3;

  @media only screen and (max-width: 760px) {
  }
`;
export const CollapseButton = styled.button`
  width: 60px;
  height: 48px;
  color: #fff;
  border: none;
  background: ${(props) => props.bgColor};
  cursor: pointer;
`;
export const Title = styled.h3`
  font-family: 'Lato';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #000000;
  margin: 0;

  @media only screen and (max-width: 760px) {
  }

`;
export const MissionField = styled.p`

  border: none;
  background-color: white;
  border-radius: 3px 0 0 3px;
  padding: 21px 15px;
  width: 100%;
  border-top: 2px solid #eee3e3;
  &:-ms-keyboard-active {
    border-style: none;
  }
<<<<<<< HEAD
  @media only screen and (max-width: 720px) {
    width: 80vw;
    padding: 10px 15px;
=======

  @media only screen and (max-width: 760px) {
  }
  @media only screen and (max-width: 425px) {

>>>>>>> a272c2983ada2341bf7af49aafc78556249e6687
  }
`;

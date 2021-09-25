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
  @media only screen and (max-width: 760px) {
    width: 98%;
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

  @media only screen and (max-width: 420px) {
    right: ${(props) => props.rsRight};
  }
`;
export const Title = styled.h3`
  font-family: 'Lato';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #000000;
  margin: 0;

  @media only screen and (max-width: 420px) {
    top: ${(props) => props.rsTop};
    right: ${(props) => props.rsRight};
  }
`;
export const VisionField = styled.p`
  width: 90%;
  border: none;
  background-color: white;
  border-radius: 3px 0 0 3px;
  padding: 21px 15px;
  border-top: 2px solid #eee3e3;
  &:-ms-keyboard-active {
    border-style: none;
  }
  @media only screen and (max-width: 760px) {
  }
  @media only screen and (max-width: 425px) {
  }
`;

export const CollapseButton = styled.button`
  padding: 23px 24px 24px;
  color: #fff;
  border: none;
  background-color: #00bb7c;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;

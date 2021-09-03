import styled from 'styled-components';

const ParentTab = styled.div`
  margin: 20px;
  width: 95%;
  background-color: #ffffff;
  height: 100%;
`;

const InnerParentTab = styled.div`
  width: 100%;
  background-color: #ffffff;
  height: 100px;
  display: flex;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
`;

const TitleTag = styled.div`
  width: 20%;
  background-color: #ffffff;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tags = styled.div`
  width: 100%;
  background-color: #ffffff;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
`;

const ProgressTab = styled.div`
  width: 55%;
  background-color: #ffffff;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressDetails = styled.div`
  width: 90%;
  background-color: #ffffff;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  align-items: center;
  margin-bottom: 2%;
`;
const Progress = styled.div`
  background-color: rgba(226, 219, 219, 0.5);
  border-radius: 20px;
  position: relative;
  margin: 15px 0;
  height: 12px;
  width: 90%;
  margin-top: 15px;
`;

const ProgressData = styled.div`
  background: #2f80ed;
  border-radius: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12px;
  width: 30%;
  opacity: 1;
  transition: 1s ease 0.3s;
  margin-bottom: 30px;
`;

const IconCont = styled.div`
  width: 25%;
  background-color: #ffffff;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Icon = styled.div`
  width: auto;
  color: #8d8d8d;
  height: 8px;
  display: flex;
  padding-bottom: 30px;
`;

export {
  ParentTab,
  InnerParentTab,
  TitleTag,
  Tags,
  ProgressTab,
  ProgressDetails,
  Progress,
  ProgressData,
  IconCont,
  Icon,
};

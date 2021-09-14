import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';



export const StyledCard = styled(Card)``;

export const StyledTypography = styled(Typography)`
  font-size: 20px;
  color: #00b87c;
  font-weight: bold;
`;

export const StyledLine = styled.hr`
  width: 10%;
  position: relative;
  top: 8px;
  right: 45%;
  border: 0.8px solid #00b87c;
`;

export const StyledFolder = styled.p`
  font-size: 16px;
`;

export const StyledGoals = styled.p`
  font-size: 15px;
  color: #999999;
  position: relative;
  top: -5px;
  left: 20%;
`;

export const StyledGoalSegment = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee3e3;
  display: flex;
  padding-left: 15px;
  color: #393939;
`;

export const Icon = styled(KeyboardArrowDownIcon)`
  position: relative;
  top: 7px;
  margin-right: -10px;
`;

export const Progress = styled.div`
  width: 100px;
  background: #ebebeb;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Upper = styled.div`
  width: 150px;
  background: red;
  height: 150px;
  background: rgb(2, 0, 36);
  background: linear-gradient(45deg, #00b87c 70%, #2f80ed 30%, #ebebeb 80%, #f44336 90%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Lower = styled.div`
  width: 120px;
  background: red;
  height: 120px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  border-radius: 50%;
`;

export const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

export const Legend = styled.div`
  height: 20vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Subcontainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Item = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background: ${({ background }) => background};
`;

export const Para = styled.p`
  font-size: 14px;
  padding: 8px;
  font-weight: 400;
`;

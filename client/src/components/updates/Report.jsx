import {
  StyledCard,
  StyledContainer,
  StyledTypography,
  StyledLine,
  StyledFolder,
  StyledGoals,
  StyledGoalSegment,
  Icon,
  Bar,
  Upper,
  Lower,
  Legend,
  Subcontainer,
  Item,
  Para,
} from './Report.styled';

const Report = () => {
  return (
    <StyledContainer>
      <StyledCard>
        <StyledGoalSegment>
          <StyledFolder>FOLDER:</StyledFolder>
          <StyledGoals>
            All Goals
            <Icon />
          </StyledGoals>
        </StyledGoalSegment>

        <Bar>
          <Upper>
            <Lower>75%</Lower>
          </Upper>
        </Bar>

        <Legend>
          <Subcontainer>
            <Item background="#EBEBEB" />
            <Para>60 Goals</Para>
          </Subcontainer>
          <Subcontainer>
            <Item background="#2F80ED" /> <Para>52 In Progress</Para>
          </Subcontainer>
          <Subcontainer>
            <Item background="#F44336" /> <Para>10 Expired</Para>
          </Subcontainer>
          <Subcontainer>
            <Item background="#00B87C" /> <Para>27 Completed</Para>
          </Subcontainer>
        </Legend>
      </StyledCard>
    </StyledContainer>
  );
};

export default Report;

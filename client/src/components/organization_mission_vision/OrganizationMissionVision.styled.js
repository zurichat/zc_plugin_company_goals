import styled from 'styled-components';

const OrganizationMissionAndVisionContainer = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  flex-direction: column;
  margin: 1.56rem auto;
  width: 90%;
  @media (min-width: 600px) {
    justify-content: space-between;
    flex-flow: row nowrap;
    width: 95%;
  }
`;

export default OrganizationMissionAndVisionContainer;

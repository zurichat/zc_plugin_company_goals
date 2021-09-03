import { StyledCard, StyledContainer, StyledTypography, StyledLine, StyledFolder, StyledGoals, StyledGoalsegment, Icon, Progress, Bar, Upper,Lower, Lengend, Subcontainer, Item, Para, Arc } from "./Report.styled"



const Report = () => {
    

    return (
            <StyledContainer>
                <StyledTypography>
                    Report
                </StyledTypography>
                <StyledLine>

                </StyledLine>
                
                <Styledcard>
                    <StyledGoalsecment>
                    <StyledFolder>
                        FOLDER:
                    </StyledFolder>
                    <StyledGoals>
                        All Goals<Icon></Icon>
                    </StyledGoals>
                    </StyledGoalsecment>

                    <Bar>
                        
                      <Upper>
                          <Lower>75%</Lower>
                      </Upper>
                    </Bar>
                    
                   <Lengend>
                       <Subcontainer>
                        <Item background="#EBEBEB" /><Para>60 Goals</Para>
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
                    
                   </Lengend>
                   
                    
                    
                </Styledcard>
            </StyledContainer>
    )
}

export default Report
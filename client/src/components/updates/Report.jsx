import { Styledcard, StyledContainer, StyledTypography, StyledLine, StyledFolder, StyledGoals, StyledGoalsecment, Icon, Progress, Bar, Upper,Lower, Lengend, Subcontainer, Item, Item2, Item3, Item4, Para, Arc } from "./Report.styled"



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
                        <Item></Item> <Para>60 Goals</Para>
                       </Subcontainer>
                       <Subcontainer>
                        <Item2></Item2> <Para>52 In Progress</Para>
                       </Subcontainer>
                       <Subcontainer>
                        <Item3></Item3> <Para>10 Expired</Para>
                       </Subcontainer>
                       <Subcontainer>
                        <Item4></Item4> <Para>27 Completed</Para>
                       </Subcontainer>
                    
                   </Lengend>
                   
                    
                    
                </Styledcard>
            </StyledContainer>
    )
}

export default Report
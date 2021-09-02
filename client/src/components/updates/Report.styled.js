import Card from '@material-ui/core/Card';
import  Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const StyledContainer = styled.div`
    width: 90%;
    margin: 20px;
    
`;


const Styledcard = styled(Card)`
    width: 30%;
    height: 80vh;
    
    
`;

const StyledTypography = styled(Typography)`
    font-size: 20px;
    color: #00B87C;
    font-weight: bold;
`;

const StyledLine = styled.hr`
    width: 10%;
    position: relative;
    top: 8px;
    right: 45%;
    border: 0.8px solid #00B87C;
`;

const StyledFolder = styled.p`
    font-size: 16px;
`;

const StyledGoals = styled.p`
    font-size: 15px;
    color: #999999;
    position: relative;
    top: -5px;
    left: 20%;
`;

const StyledGoalsecment = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #EEE3E3;
    display: flex;
    padding-left: 15px;
    color: #393939;

`;

const Icon = styled(KeyboardArrowDownIcon)`
    position: relative;
    top: 7px; 
    margin-right: -10px;
`;

const Progress = styled.div`
    width: 100px;
    background: #EBEBEB;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    

    `;

const Upper = styled.div`
    width: 150px;
    background: red;
    height: 150px;
    background: rgb(2,0,36);
    background: linear-gradient(45deg, #00B87C 70%, #2F80ED 30%, #EBEBEB 80%, #F44336 90%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const Lower = styled.div`
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

const Bar = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 40vh;
`;

const Lengend = styled.div`
    height: 20vh;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const Subcontainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    
`;

const Item = styled.div`
width: 25px;
height: 25px;
border-radius: 5px;
background: #EBEBEB;
`;

const Item2 = styled.div`
width: 25px;
height: 25px;
border-radius: 5px;
background: #2F80ED;
`;

const Item3 = styled.div`
width: 25px;
height: 25px;
border-radius: 5px;
background: #F44336;
`;

const Item4 = styled.div`
width: 25px;
height: 25px;
border-radius: 5px;
background: #00B87C;
`;

const Para = styled.p`
    font-size: 14px;
    padding: 8px;
    font-weight: 400;
`;


export {Styledcard, StyledTypography, StyledLine, StyledContainer,StyledGoalsecment, StyledFolder, StyledGoals, Icon, Progress, Bar, Upper, Lower, Lengend, Subcontainer, Item, Item2, Item3, Item4, Para};
// export {};
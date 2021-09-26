import React from 'react';

//importing styled componetns
import { BackGroundContainer, HeroButton, Paragraph } from './Landing.styled';
import { HeroInformationContainer } from './Landing.styled';
import {Link} from 'react-router-dom';

//import background image to ne used
import bgImage from '../../Images/webp/bg-image.webp';


// This component will render the landing page contents in container.
const Landing = ()=>{
    return(
    <BackGroundContainer img={bgImage}>
        <HeroInformationContainer>
          <Paragraph>Welcome to the Company Goals Room </Paragraph>
           <Link to="/goals">
               <HeroButton aria-label='Hero button'>Join Room</HeroButton>
           </Link>
        </HeroInformationContainer>
    </BackGroundContainer>

    )
}
export default Landing
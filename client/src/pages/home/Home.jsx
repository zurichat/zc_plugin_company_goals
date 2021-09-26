import React from 'react';

//importing styled componetns
import { BackGroundContainer, HeroButton, Paragraph } from './Home.styled';
import { HeroInformationContainer } from './Home.styled';
import { Link } from 'react-router-dom';

//import background image to be used
import bgImage from '../../Images/webp/bg-image.webp';

// This component will render the landing page contents in container.
const Home = () => {
  return (
    <BackGroundContainer img={bgImage}>
      <HeroInformationContainer>
        <Paragraph>Welcome to the Company Goals Room </Paragraph>
        <Link to="/room/6145d099285e4a184020742e">
          <HeroButton aria-label="Hero button">Join Room</HeroButton>
        </Link>
      </HeroInformationContainer>
    </BackGroundContainer>
  );
};
export default Home;

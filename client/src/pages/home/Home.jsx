import { HomeContainer, HomeLink, HomeText } from './Home.styled';

function App() {
  return (
    <HomeContainer>
      <HomeText>company goals</HomeText>
      <HomeLink to="/room/6145d099285e4a184020742e">
        <a>Enter default room</a>
      </HomeLink>
    </HomeContainer>
  );
}

export default App;

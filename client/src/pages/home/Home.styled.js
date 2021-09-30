import styled from "styled-components";// Sticklo have sense! the styled components library we installed is imported here!


// styling a div container
export const BackGroundContainer = styled.div`
width:100%;
height:100vh;
background-image:url(${(props)=>props.img});
background-repeat:no-repeat;
background-position:center;
background-size:cover;
display: flex;
  justify-content: center;
  align-items: center;
 position: relative;
 z-index:99;

  &::after{
    position:absolute;
    content:'';
    top:0; left:0; width:100%; height:100%;
    background:black;
    opacity:.5;

  }
`;

export const HeroInformationContainer = styled.div`
 display: flex;
  justify-content: center;
  flex-direction:column;
  color:white;
  z-index:999;
  a{
      text-align:center;
  }
`;

export const HeroButton = styled.button`
border:none;
outline:none;
padding:1rem 2rem;
color:white;
background-color:black;
border-radius:30px;
max-width:75%;
margin:0 auto;
cursor: pointer;


&:hover{
    background-color:rgb(0, 184, 124);
}

`;

export const Paragraph = styled.p`
font-size:2rem;
padding: 2rem;
@media only screen and (max-width: 375px){

text-align:center;
font-size:1.6rem;

}

`;


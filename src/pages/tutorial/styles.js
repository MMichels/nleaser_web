import styled from "styled-components";


export const LayoutHome = styled.div`
    grid-template-rows: 50px auto;
    grid-template-areas:
    'Head'
    'Body';
`;

export const HeadArea = styled.div`
    grid-area: Head;
`;


export const BodyArea = styled.div`
    grid-area: Body;
    background-image: url('images/home/fundo1.jpg');
    //background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    height: 90vh;
    width: 100%;
    overflow: hidden !important;
    //display: grid;
    grid-template-rows: 50px auto;
    grid-template-areas:
    'Title'
    'Element';
`;

export const TitleCarosel = styled.div`
    grid-area: Title;
    text-align:center;
    padding-top:25px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: bold;
    font-size:37px;
`;
export const AreaCarosel = styled.div`
    grid-area: Element;
    
`;


export const Area = styled.div`
    background-image: url('images/home/fundo1.jpg');
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-areas:
    'Titulo'
    'Frase';
`;

export const TutorialTitle = styled.div`
    grid-area: Titulo;
    text-align:center;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-top:15em;
    padding-bottom:auto;
    
`;

export const TutorialTitletext = styled.h2`
    font-size: 32px;
`;

export const TutorialTexto = styled.div`
    grid-area: Frase;
    text-align:center;
    margin-top:2em;
    padding-bottom:auto;
`;

export const TutorialTextotext = styled.p`
    font-size: 17px;
`;

export const TutorialElement = styled.div`
    grid-area: Element;
`;

export const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 80%;
  background-color: rgba(103,58,183,0.8) ;
  color: black;
  margin-bottom:2%;
  margin-top:2%;
  font-size: 27px;
  font-weight: bold;
  text-align: center;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  grid-template-rows: 1fr 3fr;
  grid-template-areas:
    'Topo'
    'Corpo';
`;


import styled from "styled-components";


export const Container = styled.div`
    grid-area: Card2;
    width: 99.1vw;
    height:350px;
    background-image: url('back.png');
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    background-attachment: fixed;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px 300px;
    grid-template-areas:
    'title title title'
    'card1 card2 card3'; 
    justify-items: center;
    align-items:center;

`;


export const Box_Title = styled.div`
    grid-area: title;
    position:relative;
    display:inline-block;
    
`;
export const Title = styled.h2`
    font-size:24px;
    color:white;
    text-align:center;
    text-shadow:#000 1px -1px;

`;
export const Text = styled.p`
    font-size:18px;
    color:black;
    text-align:center;
`;


export const Box1 = styled.div`
    grid-area: card1;
    display:grid;
    width: 300px;
    height: 150px;
    background-color:white;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding-left:5px;
    padding-right:5px;
    
    
`;
export const Box2 = styled.div`
    grid-area: card2;
    display:grid;
    width: 300px;
    height: 150px;
    background-color:white;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding-left:5px;
    padding-right:5px;

    
`;
export const Box3 = styled.div`
   grid-area: card3;
    display:grid;
    width: 300px;
    height: 150px;
    background-color:white;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding-left:5px;
    padding-right:5px;
   
`;

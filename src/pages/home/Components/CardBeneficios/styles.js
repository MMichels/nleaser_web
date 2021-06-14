import styled from "styled-components";


export const Container = styled.div`
    grid-area: Card2;
    width: auto;
    height:280px;
    background-image: url("images/home/back.png");
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    background-attachment: fixed;
    display: grid;
    justify-items: center;
    align-items:center;
    grid-template-areas:
    'title'
    'carrosel';

`;


export const Flex = styled.div`
    width: 15px;
    height: 15px;
    background: #000;
    padding-left: 10px;

    
`;
export const Title = styled.div`
    grid-area: title;
    display: flex;
    font-size:24px;
    color:white;
    height: 40px;
    width: 400px;
    border-radius: 1px;
    background-color: rgba(104, 59, 183, 1);
    justify-content: center;
    align-items: center;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;


export const Square = styled.div`
    
    background: #000;

`;

export const Item = styled.div`
  grid-area: carrosel;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 100%;
  border-radius: 1px;
  color: white;
  font-size: 17px;
  margin-left:20% ;
  margin-right:20% ;
  text-align: center;
  margin-bottom: 10px;
  
  
  

`;

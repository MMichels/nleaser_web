import styled from "styled-components";


export const Container = styled.div`
    grid-area: Card4;
    text-align:center;
    padding-top: 15px;
`;

export const TabsHeader = styled.div`
    margin: auto;
    display: flex;
    align-items: center;
    width: 85%;
`;

export const ButtonFerramenta = styled.button`
    margin: 5px 0px;
    padding: 10px 4px;
    font-size: 18px;
    width: 100%;
    &:hover {
        background-color: #F5F5F5;
    }    
`;

export const Box = styled.div`
    background-color: #ffffff;
    font-size: 34px;
    text-align: center;
    padding: 10px 10% 20px 10%;
   
`;

export const ImgBox= styled.img`
    padding : 25px 15% 25px 15%;
    align-items: center;
    overflow: hidden;
    width: auto;
    height: 600px;

`;

export const Box_Similaridades= styled.div`
    padding: 15px 15px 15px 15px;
`;

export const TitleBox= styled.h2`
    padding-top:10px;
    color: black;
    font-size:24px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

export const TextBox= styled.p`
    padding: 15px ;
    color: black;
    font-size:17px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    padding-left:20%;
    padding-right:20%;
`;
export const Item = styled.div`
  grid-area: carrosel;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin: 0 15px;
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
  
  

`;

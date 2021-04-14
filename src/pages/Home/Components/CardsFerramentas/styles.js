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
    font-size: 18px;
    text-align: center;
    padding: 10px 10% 20px 10%;
   
`;

export const ImgBox= styled.img`
    padding : 25px 15% 25px 15%;
    align-items: center;
    overflow: hidden;
    width: 80%;
    height: 80%;

`;

export const Box_Similaridades= styled.div`
    padding: 15px 15px 15px 15px;
`;

export const TitleBox= styled.h2`
    padding: 15px ;
`;

export const TextBox= styled.p`
    padding: 15px ;
`;

import styled from "styled-components";


export const Container = styled.div`
    grid-area: Card4;
    text-align:center;
    padding-top: 15px;
`;

export const TabsHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const ButtonFerramenta = styled.button`
    margin: auto;
    padding: 10px 4px;
    font-size: 18px;
    &:hover {
        background-color: #F5F5F5;
    }    
    background: ${({toggle}) => toggle ? 'none': '#446677'};
`

export const Box = styled.div`
    background-color: #ffffff;
    font-size: 18px;
    text-align: center;
    padding: 10px 10% 20px 10%;
   
`;

export const Img_Box= styled.img`
    padding : 25px 15% 25px 15%;
    align-items: center;
    overflow: hidden;
    width: 80%;
    height: 80%;

`;

export const Box_Similaridades= styled.div`
    padding: 15px 15px 15px 15px;
`;

export const Title_box= styled.h2`
    padding: 15px ;
`;

export const Text_box= styled.p`
    padding: 15px ;
`;

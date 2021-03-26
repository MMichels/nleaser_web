import styled from "styled-components";


export const Container = styled.div`
    grid-area: Card4;
    text-align:center;
    padding-top: 15px;
`;

export const Tab_env = styled.div`
    display: grid;
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    grid-template-columns: repeat(8, 1fr);
`;

export const Box_r= styled.div`
`;

export const But1 = styled.button`
    padding: 10px 4px 10px 4px;
    font-size: 18px;
    &:hover {
        background-color: #F5F5F5;
    }
   
`;
export const But2 = styled.div`
    padding: 10px 4px 10px 4px;
    font-size: 18px;
    background: ${({toggle}) => toggle ? 'none': '#446677'};

`;
export const But3 = styled.div`
    padding: 10px 4px 10px 4px;
    font-size: 18px;

`;
export const But4 = styled.div`
    padding: 10px 4px 10px 4px;
    font-size: 18px;

`;
export const But5 = styled.div`
    padding: 10px 4px 10px 4px;
    font-size: 18px;
    
`;
export const But6 = styled.div`
    padding: 10px 4px 10px 4px;
    font-size: 18px;
    
`;

export const Box_l = styled.div`
    
`;

export const Box = styled.div`
    background-color: #ffffff;
    font-size: 18px;
    text-align: center;
    padding: 10px 10% 20px 10%;

    &:target ~ ${Box_l}{
        background-color:#ffffff;
    }
    
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

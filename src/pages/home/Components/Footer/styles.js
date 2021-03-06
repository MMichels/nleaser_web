import styled from "styled-components";


export const Container = styled.div`
    grid-area: Head;
    display: grid;
    grid-template-columns: 5% 50% 20% 20% 5%;
    grid-template-rows: 2% 35% 20% 10% 10% 23%;
    grid-template-areas:
    'Margin_s Margin_s  Margin_s    Margin_s    Margin_s'
    'BoX_r    BoX1      User1_img   User2_img   BoX_l'
    'BoX_r    BoX1      User1_name  User2_name  BoX_l'
    'BoX_r    BoX1      User1_eng   User2_eng   BoX_l'
    'BoX_r    BoX1      User1_rede  User2_rede  BoX_l'
    'BoX_r    BoX1      User1_But   User2_But   BoX_l'
    ;
`;

export const TituloNome = styled.h2`
    margin-top: 15px;
    font-size:24px;
    text-align:center;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

export const TituloSe = styled.h3`
    margin-top:0px;
    text-align: center;
    font-size:15px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

export const Imgem = styled.img`
    width: 60px;
    height: 60px;
    align-self: center;
    border-radius: 100%;
    margin-top:15px;
    margin-left: auto;
    margin-right:auto;
    overflow: hidden;
    position: relative;
`;

export const MarginSup = styled.div`
    display: grid;
    grid-area: Margin_s;
    background-color:rgb(104, 59, 183);
    
`;  

export const BoX = styled.div`
    display: grid;
    grid-area: BoX1;
    width: 100%;
    height: 220px;
    text-align: center;
    padding-top:12.2%;
    font-size: 24px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

export const MargemR = styled.div`
    display: grid;
    grid-area: BoX_r;
    
`;

export const MargemL = styled.div`
    display: grid;
    grid-area: BoX_l;
    
`;

export const User_1 = styled.div`
    display: grid;
    grid-area: User1;
`;

export const User1img = styled.div`
    display: grid;
    grid-area: User1_img;
    
`;

export const User1name = styled.div`
    display: grid;
    grid-area: User1_name;
    
`;

export const User1eng = styled.div`
    display: grid;
    grid-area: User1_eng;
    
`;

export const User1rede = styled.div`
    display: grid;
    grid-area: User1_rede;
    
`;

export const User_2 = styled.div`
    display: grid;
    grid-area: User2;
    
`;

export const User2img = styled.div`
    display: grid;
    grid-area: User2_img;
    
`;

export const User2name = styled.div`
    display: grid;
    grid-area: User2_name;

`;

export const User2eng = styled.div`
    display: grid;
    grid-area: User2_eng;
    
`;

export const User2rede = styled.div`
    display: grid;
    grid-area: User2_rede;
    
`;

export const User2But = styled.div`
    display: grid;
    grid-area: User2_But;
    grid-template-columns: auto auto;
    grid-template-areas:
    'Div1 Div2';
`;

export const SocialLink1 = styled.div`
    grid-area: Div1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
`;

export const SocialGit1 = styled.div`
    display: grid;
    grid-area: Div2;
    display: flex;
    align-items: center;
    justify-content:flex-start;
    padding-left: 10px;
`;

export const User1But = styled.div`
    display: grid;
    grid-area: User1
     _But;
    grid-template-columns: auto auto;
    grid-template-areas:
    'Div3 Div4';
    
    
`;

export const SocialLink2 = styled.div`
    grid-area: Div3;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
`;

export const SocialGit2 = styled.div`
    grid-area: Div4;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10px;
`;

import styled from "styled-components";



export const Container = styled.div`
    grid-area: Head;
    display:flex;

`;
export const Text = styled.h1`
    position:relative;  
    margin: 5%;
    font-weight: bold;
    color: black;
    font-size:29px;
    text-align:center;
    top:10%;
`;
export const Card1 = styled.div`
    width: 100%;
    height: 150px;
    background-color: #ff0000;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 5px 10px white;
    filter:opacity(0.5);
`;

export const Card = styled.div`
    width: 100vw;
    height: 100vh;    
    background-image: url('images/home/Fundo_cidade.jpg');
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    background-attachment: fixed;
`;


export const ExpCard = styled.div`
    width: 50%;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`;
import styled from "styled-components";



export const Container = styled.div`
    grid-area: Head;
    display:flex;

`;
export const Text = styled.h1`
    position:relative;  
    margin: 5%;
    font-weight: bold;
    color: white;
    font-size:29px;
    text-align:center;
    top:2%;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;
export const Card1 = styled.div`
    width: 100%;
    height: 100px;
    background-color: rgb(104, 59, 183);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -40%;
    transform: translate(-50%, -50%);
    border-radius: 1px;
    border: none;
    padding: 10px;
    
    
`;

export const Card = styled.div`
    width: 100vw;
    height: 100vh;    
    background-image: url('images/home/img-bck.jpg');
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
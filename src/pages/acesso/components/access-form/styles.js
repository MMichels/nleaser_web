import styled from "styled-components";

export const AccessFormStyled = styled.form`        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(0,0,0,0.9);    
    width: 400px;
    height: 500px;

    margin: auto;

    hr {
        margin: 10px 0;
        border: none;
        border-bottom: 1px solid #cdcdcd;
        width: 100%;
    }

    a {
        font-size: 16pt;
        font-weight: bold;
        color: #999;
        text-decoration: none;
    }
`;

export const TitleStyled = styled.p`    
    color: #f00;
    text-align: center;
    text-shadow: 2px 2px #100;
    font-size: 22pt;
    font-weight: bold; 
    
    width: 80%;
    margin: 10px;
`;

export const DescriptionStyled = styled.p`
    color: #bbb;
    font-size: 12pt;
    text-align: center;

    margin: 10px;
    margin-bottom: 18px;
`;
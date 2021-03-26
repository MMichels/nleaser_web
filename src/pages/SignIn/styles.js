import styled from 'styled-components';


export const Container = styled.div`
    background-image: url("Fundo_cidade.jpg");
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    
`;

export const Form = styled.form`
    margin: auto;
    width: 400px;
    height: 400px;
    background-color: rgba(0,0,0,.7);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    
  

    img {
        width:50%;
        margin: 10px 0 40px;        
    }

    p {
        color: #ff3333;
        margin-bottom: 25px;
        border: 1px solid #ff3333;
        padding: 10px;
        width: 100%;
        text-aling: center;
    }
    
    input {
        flex: auto;
        height: 46px;
        margin-bottom: 25px;
        padding: 0 20px;
        color: #777;
        font-size: 15px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 5px;
        &::placeholder {
            color: #999;
        }
    }

    button {
        color: #fff;
        font-size: 16px;
        background: #ff0000;
        height: 56px;
        border: 0;
        border-radius: 5px;
        width: 80%;
    }

    hr {
        margin: 20px 0;
        border: none;
        border-bottom: 1px solid #cdcdcd;
        width: 100%
    }

    a {
        font-size: 16;
        font-weight: bold;
        color: #999;
        text-decoration: none;
    }
`;

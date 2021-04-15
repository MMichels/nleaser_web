import styled from 'styled-components';

export const TextInputStyled = styled.input`
    color: black;
    font-size: 15pt;

    height: 46px;
    width: 80%;
    margin: 2px 10px;
    padding: 0 10px;   

    border: 1px solid #ddd;

    &::placeholder {
        color: #999;
    }

    &:first-of-type {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    &:last-of-type {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;
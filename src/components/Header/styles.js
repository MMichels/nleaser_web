import styled from "styled-components";


export const Container = styled.div`
    grid-area: TopNav;
    height: 75px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);    
    display: grid;
    grid-template-columns: auto auto;
`;

export const Menu = styled.nav`
    text-decoration: none;
    text-align:right;
    font-size:18px;
    padding-top:20px;
    margin: 0px 25px 20px 20px;
`;
export const LayoutMenu = styled.button`
    text-align:center;
    display: inline;
    width:120px;
    border-radius:01px;
    background-color:rgba(104, 59, 183, 1);
    padding:10px;
    margin-left:10px;
    font-size:16px;
    font-weight:bolder;
    border: none;
`;

export const Links = styled.a`
    color: white;
    text-decoration:none;
    
`;

export const Forma = styled.img`
    height: 100vh;
    width: 100vw;
    position: relative;
    filter: opacity(30%);
    overflow: hidden;
`;
 

export const Tema = styled.h1`
    position: absolute;
    top: 50%;
    padding-left:8%;
    font-size: 28px;
    color: #ffffff;
`;
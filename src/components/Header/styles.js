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
    text-align: end;    
    font-size:18px;

    padding: 25px 0px;
    margin 0px 25px;
`;
export const LayoutMenu = styled.li`
    display: inline-block;
    padding: 5px;
`;

export const Links = styled.a`
    color: 	#FF0000;
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
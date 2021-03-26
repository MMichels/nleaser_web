import styled from "styled-components";


export const Container = styled.div`
    grid-area: TopNav;
    height: 75px;
    width: 99.5%vw;
    background-color: black;    
    display: grid;
    grid-template-columns: auto auto;

`;
export const Logo= styled.img`
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
    left: 10%;
    width: 200px;
    top: 19%;
    
    @media (max-width : 1440px ){
        width: 200px;
    }
    @media (max-width : 1024px ){
        width: 175px;
    }
    @media (max-width : 768px ){
        width: 150px;
        top: 25%;
    }
    @media (max-width : 600px ){
        width: 125px;
    }
    @media (max-width : 425px ){
        width: 100px;
    }
    @media (max-width : 325px ){
        width: 75px;
    }
}

`;

export const Menu = styled.nav`
    position: relative;
    text-decoration: none;
    text-align: end;
    top:25%;
    padding: 0% 10%;
    font-size:18px;
`;
export const Layout_menu = styled.li`
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
import React from 'react';
import {Container, Menu, LayoutMenu, Links} from "./styles";
import { LogoComponent } from "../logo";


import { getToken } from "../../services/auth";





export const HeaderComponent=() => {
  const token = getToken();
  
  return (

    <Container>
        <LogoComponent/>
        <Menu >
            <ul>
                <LayoutMenu><Links href="/">Home</Links></LayoutMenu>
                <LayoutMenu><Links href="#">Sugestões</Links></LayoutMenu>
                <LayoutMenu><Links href="#">Contatos</Links></LayoutMenu>
                {(!token || token === undefined) && <LayoutMenu><Links href="/login">Login</Links></LayoutMenu>}                
                {(token && token !== undefined) && <LayoutMenu><Links href="/login?logout=true">Logout</Links></LayoutMenu>}
                <LayoutMenu><Links href="/cadastro">Cadastre-se</Links></LayoutMenu>
            </ul>
        </Menu>
    </Container>
  )
};

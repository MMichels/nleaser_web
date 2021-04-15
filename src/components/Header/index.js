import React from 'react';
import {Container, Menu, LayoutMenu, Links} from "./styles";
import { LogoComponent } from "../logo";


export const HeaderComponent=() => {
  
  return (
    <Container>
        <LogoComponent/>
        <Menu >
            <ul>
                <LayoutMenu><Links href="/">Home</Links></LayoutMenu>
                <LayoutMenu><Links href="#">Sugestões</Links></LayoutMenu>
                <LayoutMenu><Links href="#">Contatos</Links></LayoutMenu>
                <LayoutMenu><Links href="/login">Login</Links></LayoutMenu>
                <LayoutMenu><Links href="/cadastro">Cadastre-se</Links></LayoutMenu>
            </ul>
        </Menu>
    </Container>
  )
};

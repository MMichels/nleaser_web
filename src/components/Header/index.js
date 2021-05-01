import React from 'react';
import {Container, Menu, LayoutMenu, Links} from "./styles";
import { LogoComponent } from "../logo";


import { getToken } from "../../services/auth";





export const HeaderComponent=() => {
  const token = getToken();

  /**
   * Se o usuario estiver logado, coloca as opções de logout e de acessar o dashboard no Header
   * Caso contrario, coloca as opções de login e cadastro
   */
  const accessComponents = () => {
    if(token || token !== undefined)
    {
      return (
        <>
          <LayoutMenu><Links href="/dashboard">Dashboard</Links></LayoutMenu>
          <LayoutMenu><Links href="/login?logout=true">Logout</Links></LayoutMenu>        
        </>
      )
    }
    else 
    {      
      return (
        <>
          <LayoutMenu><Links href="/login">Login</Links></LayoutMenu>
          <LayoutMenu><Links href="/cadastro">Cadastre-se</Links></LayoutMenu>
        </>
      )
    }
    
  }
  
  return (

    <Container>
        <LogoComponent/>
        <Menu >
            <ul>
                <LayoutMenu><Links href="/">Home</Links></LayoutMenu>
                <LayoutMenu><Links href="#">Sugestões</Links></LayoutMenu>
                <LayoutMenu><Links href="#">Contatos</Links></LayoutMenu>
                {accessComponents()}
            </ul>
        </Menu>
    </Container>
  )
};

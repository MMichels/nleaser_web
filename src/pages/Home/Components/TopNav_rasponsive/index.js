import React,{useEffect} from 'react';
import {Container,Logo, Menu,Layout_menu,Tema, Links, Forma} from "./styles";

import LogoImg from "../../../../assets/logo.png"

const Navbar=() => {
  
  return (
    <Container>
        <Logo src={LogoImg} />
        <Menu >
            <ul>
                <Layout_menu><Links href="#">Sugestões</Links></Layout_menu>
                <Layout_menu><Links href="#">Contatos</Links></Layout_menu>
                <Layout_menu><Links href="#">Projeto</Links></Layout_menu>
                <Layout_menu><Links href="/login">Login</Links></Layout_menu>
            </ul>
        </Menu>

    </Container>
  )
};

export default Navbar;
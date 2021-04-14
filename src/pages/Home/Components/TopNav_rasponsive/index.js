import React,{useEffect} from 'react';
import {Container,Logo, Menu,Layout_menu,Tema, Links, Forma} from "./styles";

const Navbar=() => {
  
  return (
    <Container>
        <Logo src='logo.png' />
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
import React, { useState  } from 'react';
import {Container,Title,Item,ImgFundo} from "./styles";
import "./styles.css"
import Carousel from "react-elastic-carousel";



export function CardBeneficios() {
    return (
        
        <Container >
            <Title>
                Por que utilizar a Nleaser?
            </Title>
            <Carousel pagination = {false}>
                <Item>Para utiliza-la de forma rapida e simples basta criar uma conta, carregar os seus dados e pronto, como um passo de magica todo o poder da NLP estara na sua mão.</Item>
                <Item>NLeaser lhe proporciona acesso a uma serie de metodos de NLP</Item>
                <Item>NLeaser é uma API Open source, que pode ser facilmente integrado ao seu projeto, facilitando seu trabalho e lhe garantindo manter seus dados seguros.</Item>
            </Carousel>
        </Container>
    )
} 
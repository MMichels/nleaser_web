import React from 'react';

import {Container,BoxTitle,TextBox,Title,Text} from "./styles";

export function CardBeneficios() {

    return (
        <Container>
            <BoxTitle>
               <Title>Por que utilizar a Nlesaer ?</Title> 
            </BoxTitle>
            <TextBox>
                <Text>
                Para utiliza-la de forma rapida e simples basta criar uma conta, carregar os seus dados e pronto, como um passo de magica todo o poder da NLP estara na sua mão.
                </Text>
            </TextBox>
            <TextBox>
                <Text>
                NLeaser lhe proporciona acesso a uma serie de metodos de NLP 
                </Text>
            </TextBox>
            <TextBox>
                <Text>
                NLeaser é uma API Open source, que pode ser facilmente integrado ao seu projeto, facilitando seu trabalho e lhe garantindo manter seus dados seguros.
                </Text>
            </TextBox>
        </Container>
    )
} 
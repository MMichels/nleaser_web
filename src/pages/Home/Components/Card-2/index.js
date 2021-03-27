import React from 'react';

import {Container,Box_Title,Box1,Box2,Box3,Title,Text} from "./styles";

export default function CardBeneficios() {

    return (
        <Container>
            <Box_Title>
               <Title>Por que utilizar a Nlesaer ?</Title> 
            </Box_Title>
            <Box1>
                <Text>
                Para utiliza-la de forma rapida e simples basta criar uma conta, carregar os seus dados e pronto, como um passo de magica todo o poder da NLP estara na sua mão.
                </Text>
            </Box1>
            <Box2>
                <Text>
                NLeaser lhe proporciona acesso a uma serie de metodos de NLP 
                </Text>
            </Box2>
            <Box3>
                <Text>
                NLeaser é uma API Open source, que pode ser facilmente integrado ao seu projeto, facilitando seu trabalho e lhe garantindo manter seus dados seguros.
                </Text>
            </Box3>
        </Container>
    )
} 
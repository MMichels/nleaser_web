import React from 'react';
import { Link } from 'react-router-dom';

import {Container,Card,Card1,Text,Exp_Card} from "./styles";



export default function Header() {

    return (
        <Container>
            <Card>
                <Exp_Card>
                <Card1/>
                <Text>NLeaser é a forma mais facil de seus dados virarem soluções</Text>
                </Exp_Card>
            </Card>
           
        </Container>
    )
}


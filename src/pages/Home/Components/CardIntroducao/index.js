import React from 'react';
import { Link } from 'react-router-dom';

import {Container,Card,Card1,Text,ExpCard} from "./styles";



export function CardIntroducao() {

    return (
        <Container>
            <Card>
                <ExpCard>
                <Card1/>
                <Text>NLeaser é a forma mais facil de seus dados virarem soluções</Text>
                </ExpCard>
            </Card>
           
        </Container>
    )
}


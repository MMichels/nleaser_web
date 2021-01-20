import React from 'react';
import { Link } from 'react-router-dom';

import { Container, PageTitle} from "../styles"

export default function Main() {
    return (
        <Container>
            <PageTitle>Bem Vindo!</PageTitle>
            <p>
                <Link to="/login">Realizar o login</Link>
            </p>
        </Container>
    )
}

import { HeaderComponent } from "../../components/Header";
import { CardIntroducao } from './Components/CardIntroducao';
import { CardExplicacao } from './Components/CardExplicacao';
import { CardBeneficios } from './Components/CardBeneficios';
import { CardMetodos } from './Components/CardMetodosHeader';
import { CardsFerramentas } from './Components/CardsFerramentas';
import { Footer } from "./Components/Footer";
import { Container, Row } from "react-bootstrap";

import styles from "./styles.module.scss";

export const OldHome = function(props) {
    return (
        <>
            <HeaderComponent/>
            <CardIntroducao/>
            <CardExplicacao/>
            <CardBeneficios/>
            <CardMetodos/>
            <CardsFerramentas/>
            <Footer/>
        </>
    )
}


export const Home = function (props) {
    return (
        <Container fluid className={styles.home + " position-absolute"}>
            <Row className="vh-100 align-items-center justify-content-center">
                <CardIntroducao/>
            </Row>
            <Row className={styles.row50 + " align-items-center justify-content-center"}>
                <CardExplicacao />
            </Row>
            <Row className={styles.row50 + " align-items-center justify-content-center"}>
                <CardBeneficios></CardBeneficios>
            </Row>
        </Container>
    )
}




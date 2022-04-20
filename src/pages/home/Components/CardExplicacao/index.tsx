import { Col,  } from "react-bootstrap";
import styles from "./styles.module.scss";

export function CardExplicacao() {

    return (
        <Col className={styles.expCard}>
            <h1 className={styles.expTitle + " pb-4"}>
                O que é a NLeaser ? 
            </h1>
            <p className={styles.expText}>
                NLeaser é um projeto que visa disponibilizar um conjunto de soluções que proporcionem as pessoas o acesso
                 as tecnologias de processamento de linguagem natural de um modo simples e fácil.
            </p>
        </Col>
    )
}
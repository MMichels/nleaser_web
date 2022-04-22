import { Col,  } from "react-bootstrap";
import styles from "./styles.module.scss";

export function CardExplicacao() {

    return (
        <Col className={styles.expCard}>
            <h1 className="text-center mb-4">
                O que é o NLeaser ? 
            </h1>
            <p className={styles.expText + " fs-5 text-center"}>
                NLeaser é um projeto que visa disponibilizar um conjunto de soluções que proporcionem as pessoas o acesso
                 as tecnologias de processamento de linguagem natural de um modo simples e fácil.
            </p>
        </Col>
    )
}
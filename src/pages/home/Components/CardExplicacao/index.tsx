import { Col,  } from "react-bootstrap";
import homeStyles from "../../styles.module.scss";


export function CardExplicacao() {

    return (
        <Col className={homeStyles.maxW720}>
            <h1 className="text-center mb-4">
                O que é o NLeaser ? 
            </h1>
            <p className={"fs-5 text-center"}>
                NLeaser é um projeto que visa disponibilizar um conjunto de soluções que proporcionem as pessoas o acesso
                 as tecnologias de processamento de linguagem natural de um modo simples e fácil.
            </p>
        </Col>
    )
}
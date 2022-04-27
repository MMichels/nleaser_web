import { Col, Container } from 'react-bootstrap';
import styles from "./styles.module.scss";

export function CardIntroducao() {

    return (        
        <Col className="bg-secondary bg-gradient bg-opacity-75 m-2 p-2" style={{maxWidth: "600px"}}>
            <h1 className={"fw-bold text-white text-center"}>NLeaser é a forma mais fácil de seus dados virarem soluções</h1>
        </Col>    
    )
}


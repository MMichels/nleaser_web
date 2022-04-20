import { Col, Container } from 'react-bootstrap';
import styles from "./styles.module.scss";

export function CardIntroducao() {

    return (        
        <Col className="bg-secondary m-auto p-1" style={{maxWidth: "600px"}}>
            <h1 className={styles.textIntroducao}>NLeaser é a forma mais fácil de seus dados virarem soluções</h1>
        </Col>    
    )
}


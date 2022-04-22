import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';

import styles from "./styles.module.scss";
import homeStyles from "../../styles.module.scss";



export function CardBeneficios() {
    return (
        
        <Col className={styles.cardBeneficios + " m-auto w-100 h-100"}>
            <h1 className={homeStyles.max1024 + " text-center text-white my-4 p-2 bg-secondary"}>
                Por que utilizar o NLeaser?
            </h1>
            <Carousel className={homeStyles.max1024 + " m-auto"} isRTL={false}>
                <div className="text-white text-center fs-5 mb-2 w-100">                    
                    <p>
                        Para utiliza-la de forma rápida e simples basta criar uma conta, carregar os seus dados e pronto, 
                        como um passe de magica todo o poder da NLP estará na sua mão.
                    </p>                
                </div>
                <div className="text-white text-center fs-5 mb-2 w-100">                    
                    <p>
                        NLeaser lhe proporciona acesso a uma serie de métodos de NLP.
                    </p>                    
                </div>
                <div className="text-white text-center fs-5 mb-2 w-100">                    
                    <p>                            
                        NLeaser é uma API Open source, que pode ser facilmente integrado ao seu projeto, 
                        facilitando seu trabalho e lhe garantindo manter seus dados seguros.                            
                    </p>                    
                </div>
            </Carousel>
        </Col>
    )
} 
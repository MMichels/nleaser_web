import React from 'react';
import { Col } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';

import styles from "./styles.module.scss";
import homeStyles from "../../styles.module.scss";



export function CardBeneficios() {
    return (
        
        <Col className={styles.cardBeneficios + " h-100"}>
            <h1 className={homeStyles.maxW720 + " text-center text-white m-auto my-4 py-2 px-5 bg-secondary bg-gradient bg-opacity-75"}>
                Por que utilizar o NLeaser?
            </h1>
            <Carousel className={homeStyles.maxW720 + " m-auto"} isRTL={false} pagination={false}>
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
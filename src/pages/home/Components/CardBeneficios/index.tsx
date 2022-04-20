import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';

import styles from "./styles.module.scss";



export function CardBeneficios() {
    return (
        
        <Col className={styles.cardBeneficios + " m-auto w-100 h-100"}>
            {//<Row className={styles.benfRow + " m-auto"}>
            }
                <h1 className={styles.benfTitle + " " + styles.max1024 + " my-4 p-2"}>
                    Por que utilizar a NLeaser?
                </h1>                
            {//</Row>
            }
            {//<Row className={styles.benfRow + " m-auto h-75"}>                    
            }
                <Carousel className={styles.max1024 + " m-auto"} isRTL={false}>
                    <div className={styles.benfItem}>
                        
                        <p>
                            Para utiliza-la de forma rápida e simples basta criar uma conta, carregar os seus dados e pronto, 
                            como um passe de magica todo o poder da NLP estará na sua mão.
                        </p>
                    
                    </div>
                    <div className={styles.benfItem}>
                        
                            <p>
                                NLeaser lhe proporciona acesso a uma serie de métodos de NLP.
                            </p>
                        
                    </div>
                    <div className={styles.benfItem}>
                        
                            <p>                            
                                NLeaser é uma API Open source, que pode ser facilmente integrado ao seu projeto, 
                                facilitando seu trabalho e lhe garantindo manter seus dados seguros.                            
                            </p>
                        
                    </div>
                </Carousel>                
            {//</Row>
            }
        </Col>
    )
} 
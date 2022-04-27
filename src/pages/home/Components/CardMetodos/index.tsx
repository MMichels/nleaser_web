import React, { useRef } from 'react';
import { Container, Image, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import homeStyles from "../../styles.module.scss";
import styles from "./styles.module.scss";

// Importacao das imagens
import WordCloudImg from "../../../../assets/images/home/WordCloud.png";
import FrequenciaImg from "../../../../assets/images/home/frequencia.png";
import NgramsImg from "../../../../assets/images/home/Ngrams.png"
import EntidadesImg from "../../../../assets/images/home/entidade.jpeg"
import TfIdfImg from "../../../../assets/images/home/TF_IDF.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


export const CardMetodosHeader = () => {
    
    return (
        <Col className={homeStyles.maxW720}>
            <h1 className="text-center mb-4">
                Quais métodos o NLEaser oferece?
            </h1>
            <p className="fs-5 text-center">
                Atualmente o NLEaser disponibiliza de 5 ferramentas para facilitar o seu trabalho.
            </p>
        </Col>
    )
}


export const CardMetodos = () => {
    const ref=useRef(null);


    const Metodos = [
        {            
            "title": "WordCloud",
            "desc": "Uma nuvem de palavras é útil para visualizar os maiores destaques em um conjunto de dados. " 
                + "A área ocupada por cada palavra / categoria é proporcional ao número de "
                + "vezes que a palavra apareceu. Uma nuvem de palavras mostrará apenas as "
                + "100 principais palavras / categorias.",
            "img": WordCloudImg
        }, 
        {
            "title": "Frequência (TF)",
            "desc": "Consiste em identificar e contar quantas vezes cada palavra isolada aparece em um conjunto de dados "
                + "Util para identificar quais pontos mais são abordados por seus clientes em avaliações de produtos / serviços.",
            "img": FrequenciaImg
        }, 
        {
            "title": "NGrams",
            "desc": "Com NGrams você pode analisar quais conjuntos de palavras (1, 2 ou 3 palavras) mais ocorrem de maneira sequencial, "
            + "facilitando a identificação dos elogios/reclamações que mais ocorrem com produtos/serviços.",
            "img": NgramsImg
        }, 
        {
            "title": "Extração de Entidades (NER)",
            "desc": "A extração de entidades serve para identificar quais nomes de pessoas, lugares, instituições e momentos históricos aparecem em um conjuto de textos.",
            "img": EntidadesImg
        }, 
        {
            "title": "Relevância (TF-IDF)",
            "desc": "Com esse método você não apenas identifica quais palavras que mais aparecem no conjunto de dados, mas também a relevância de cada uma.",
            "img": TfIdfImg
        }
    ]

    return (
        <Col className={`${styles.cardMetodos} p-2 h-100`}>            
            <Carousel className={`${homeStyles.maxW720} m-auto`}
               isRTL={false} pagination={false} ref={ref}
            >        
                {
                    Metodos.map(metodo => {
                        return (
                            <Container className={`bg-white bg-opacity-75 text-black text-center p-0 p-sm-1 p-md-2 pb-sm-2 pb-md-3`}>
                                <Container className="d-flex justify-content-center p-2 p-md-0">
                                    <h2>
                                        {metodo.title}
                                    </h2>
                                    <div className="d-block d-md-none" style={{ zIndex: 10}}>
                                        <OverlayTrigger 
                                            trigger="click"
                                            key={metodo.title}
                                            placement="top"
                                            rootClose={true}
                                            overlay={
                                                <Popover>
                                                    <Popover.Header className="text-white fs-3 bg-secondary" as="h3">
                                                        {metodo.title}
                                                    </Popover.Header>
                                                    <Popover.Body>
                                                        {metodo.desc}
                                                    </Popover.Body>
                                                </Popover>
                                            }                                            
                                        >
                                            <button className="mx-1 text-secondary" style={{backgroundColor: "transparent", border: "none"}}>
                                                <FontAwesomeIcon size="sm" fixedWidth={false} icon={faQuestionCircle} />
                                            </button>

                                        </OverlayTrigger>
                                    </div>
                                </Container>
                                <p className="d-none d-md-block fs-5">
                                    {metodo.desc}
                                </p>
                                <Image className="w-100" src={metodo.img}></Image>
                            </Container>   
                        )
                    })
                }  
                          
            </Carousel>        
        </Col>
    )
}

import React, { useRef, useState } from 'react';
import { Container, Image, Row, Col, Carousel, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import homeStyles from "../../styles.module.scss";

// Importacao das imagens
import WordCloudImg from "../../../../assets/images/home/WordCloud.png";
import FrequenciaImg from "../../../../assets/images/home/frequencia.png";
import NgramsImg from "../../../../assets/images/home/Ngrams.png"
import EntidadesImg from "../../../../assets/images/home/entidade.jpeg"
import TfIdfImg from "../../../../assets/images/home/TF_IDF.png"
import Word2VecImg from "../../../../assets/images/home/word2vec.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';



export const CardsFerramentas = () => {
    const [showPopOver, setShowPopOver] = useState(false);
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
            "title": "Frequencia (TF)",
            "desc": "Consiste em identificar e contar quantas vezes cada palavra isolada aparece em um conjunto de dados "
                + "Util para identificar quais pontos mais são abordados por seus clientes em avaliações de produtos / serviços",
            "img": FrequenciaImg
        }, 
        {
            "title": "NGrams",
            "desc": "Com NGrams você pode analisar quais conjuntos de palavras (1, 2 ou 3 palavras) mais ocorrem de maneira sequencial, "
            + "facilitando a identificação dos elogios/reclamações que mais ocorrem com produtos/serviços",
            "img": NgramsImg
        }, 
        {
            "title": "Extração de Entidades (NER)",
            "desc": "A extração de entidades serve para identificar quais nomes de pessoas, lugares, instituições e momentos históricos aparecem em um conjuto de textos",
            "img": EntidadesImg
        }, 
        {
            "title": "Relevância (TF-IDF)",
            "desc": "Com esse método você não apenas irá identificar quais palavras que mais aparece no conjunto de dados, mas também a relevância de cada uma",
            "img": TfIdfImg
        }
    ]

    return (
        <Col className="m-auto w-100 h-100" ref={ref}>
            <h1 className="text-center mb-4">
                Quais metodos o NLEaser oferece?
            </h1>
            <p className="text-center fs-5">
                Atualmente NLEaser detem de {Metodos.length} ferramentas para facilitar o seu trabalho.
            </p>       
            <Carousel id="carrouselMetodos" indicators={false} variant="dark" interval={null} className={homeStyles.max1024 + " m-auto"}>        
                {
                    Metodos.map(metodo => {
                        return (
                            <Carousel.Item className="bg-white text-center p-0 p-sm-1 p-md-2 pb-sm-2 pb-md-3">
                                <Container className="d-flex justify-content-center">
                                    <h2>
                                        {metodo.title}
                                    </h2>
                                    <div className="d-block d-md-none" style={{ zIndex: 10}}>
                                        <OverlayTrigger 
                                            trigger="click"
                                            key={metodo.title}
                                            placement="top"
                                            overlay={
                                                <Popover>
                                                    <Popover.Header as="h3">
                                                        {metodo.title}
                                                    </Popover.Header>
                                                    <Popover.Body>
                                                        {metodo.desc}
                                                    </Popover.Body>
                                                </Popover>
                                            }                                            
                                        >
                                            <button className="mx-1" style={{backgroundColor: "transparent", border: "none"}}>
                                                <FontAwesomeIcon size="sm" fixedWidth={false} icon={faQuestionCircle} />
                                            </button>

                                        </OverlayTrigger>
                                    </div>
                                </Container>
                                <p className="d-none d-md-block fs-5">
                                    {metodo.desc}
                                </p>
                                <Image className="w-100" src={metodo.img}></Image>
                            </Carousel.Item>   
                        )
                    })
                }  
                          
            </Carousel>        
        </Col>
    )
}

import React from 'react';
import { SocialIcon } from 'react-social-icons';
import styles from "./styles.module.scss";

import MateusImg from "../../../../assets/images/home/mateus.jpg";
import LucasImg from "../../../../assets/images/home/lucas.jpg";
import { Col, Container, Image, Row } from 'react-bootstrap';


const CardApresentacaoDev = function({imgSrc, nome, titulo1, titulo2, linkedin, github}){
    return (
        <Container className="d-md-flex flex-md-column align-items-center text-center p-0 m-0 my-4 my-md-0">
            <Image className={`${styles.fotoDev} rounded-circle mb-3`} src={imgSrc} width="100px" height="100px"/>
            <p className="fs-4 fw-bold m-0">{nome.split(" ").map(partNome => <>{partNome}<br /></>)}</p>
            <p className="fs-6 fw-bold m-0">{titulo1}</p>
            <p className="fs-6 fw-bold m-0">{titulo2}</p>
            <Container className="d-flex justify-content-center my-2">
                <SocialIcon className="mx-2" url={linkedin} style={{ height: 45, width: 45 }} />
                <SocialIcon className="mx-2" url={github} style={{ height: 45, width: 45 }} />
            </Container>
        </Container>
    )
}

export function Footer() {
    return (
        <div className="mt-4 border-top border-5 border-secondary bo">
            <Row className="my-3">
                <Col className="d-flex col-md-6 align-items-center text-center" md>
                    <p className="fs-4">
                        Projeto desenvolvido como parte do trabalho de conclusão de curso
                    </p>
                </Col>
                <Col className="col-md-6 d-md-flex" md>   
                    <CardApresentacaoDev 
                        imgSrc={MateusImg}
                        nome="Mateus Michels"
                        titulo1="Backend Developer"
                        titulo2="IA Enginner"
                        linkedin="https://www.linkedin.com/in/mateus-d-322213130/"
                        github="https://github.com/MMichels"
                    />
                    <CardApresentacaoDev 
                        imgSrc={LucasImg}
                        nome="Lucas Domiciano"
                        titulo1="Frontend Developer"
                        titulo2="UX Design"
                        linkedin="https://www.linkedin.com/in/lucas-domiciano-1bb334124/"
                        github="https://github.com/Lucdk"
                    />
                </Col>
            </Row>
        </div>
    )
}
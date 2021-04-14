import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

import { Container, BoX,Margem_l,Margem_r,User1eng,User1name,User2eng,
    User1img,User1rede,User2img,User2name,User2rede,Margin_sup,Imgem,
    Titulo_nome,Titulo_se,User1But,User2But,Social_git1,Social_link1,
    Social_link2,Social_git2
} from "./styles"

export default function Footer() {
    return (
        <Container>
            <Margin_sup/>
            <   Margem_r/>
            <BoX>
                Projeto desenvolvido como parte do trabalho de conclusão de curso 
            </BoX>

            <User1img>
                <Imgem src='matheus.jfif'/>
            </User1img>
            <User1name>
                <Titulo_nome>Mateus Michels</Titulo_nome>
            </User1name>
            <User1eng>
                <Titulo_se>Backend Developer</Titulo_se>
            </User1eng>
            <User1rede>
                <Titulo_se>IA Engineer</Titulo_se>
            </User1rede>
            <User1But>
                <Social_link2>
                    <SocialIcon url="https://www.linkedin.com/in/lucas-domiciano-1bb334124/" />
                </Social_link2>
                <Social_git2>
                    <SocialIcon url="https://github.com/Lucdk" />
                </Social_git2>
            </User1But>

            <User2img>
                <Imgem src='lucas.jfif'/>
            </User2img>
            <User2name>
                <Titulo_nome>Lucas Domiciano</Titulo_nome>
            </User2name>
            <User2eng>
                <Titulo_se>Frontend Developer</Titulo_se>
            </User2eng>
            <User2rede>
                <Titulo_se>UX Design</Titulo_se>
            </User2rede>
            <User2But>
                <Social_link1>
                    <SocialIcon url="https://www.linkedin.com/in/lucas-domiciano-1bb334124/" />
                </Social_link1>
                <Social_git1>
                    <SocialIcon url="https://github.com/Lucdk" />
                </Social_git1>
                
            </User2But>
                
            <Margem_l/>
        </Container>
    )
}

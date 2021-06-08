import React from 'react';
import { SocialIcon } from 'react-social-icons';

import { Container, BoX,MargemL,MargemR,User1eng,User1name,User2eng,
    User1img,User1rede,User2img,User2name,User2rede,MarginSup,Imgem,
    TituloNome,TituloSe,User1But,User2But,SocialGit1,SocialLink1,
    SocialLink2,SocialGit2
} from "./styles"


import MateusImg from "../../../../assets/images/home/mateus.jfif";
import LucasImg from "../../../../assets/images/home/lucas.jfif";

export function Footer() {
    return (
        <Container>
            <MarginSup/>
            <MargemR/>
            <BoX>
                Projeto desenvolvido como parte do trabalho de conclusão de curso 
            </BoX>

            <User1img>
                <Imgem src={MateusImg}/>
            </User1img>
            <User1name>
                <TituloNome>Mateus Michels</TituloNome>
            </User1name>
            <User1eng>
                <TituloSe>Backend Developer</TituloSe>
            </User1eng>
            <User1rede>
                <TituloSe>IA Engineer</TituloSe>
            </User1rede>
            <User1But>
                <SocialLink2>
                    <SocialIcon url="https://www.linkedin.com/in/lucas-domiciano-1bb334124/" />
                </SocialLink2>
                <SocialGit2>
                    <SocialIcon url="https://github.com/Lucdk" />
                </SocialGit2>
            </User1But>

            <User2img>
                <Imgem src={LucasImg}/>
            </User2img>
            <User2name>
                <TituloNome>Lucas Domiciano</TituloNome>
            </User2name>
            <User2eng>
                <TituloSe>Frontend Developer</TituloSe>
            </User2eng>
            <User2rede>
                <TituloSe>UX Design</TituloSe>
            </User2rede>
            <User2But>
                <SocialLink1>
                    <SocialIcon url="https://www.linkedin.com/in/lucas-domiciano-1bb334124/" />
                </SocialLink1>
                <SocialGit1>
                    <SocialIcon url="https://github.com/Lucdk" />
                </SocialGit1>
                
            </User2But>
                
            <MargemL/>
        </Container>
    )
}

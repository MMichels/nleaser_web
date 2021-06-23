import React, { Component } from 'react';
import { HeaderComponent } from '../../components/Header';
import { Player } from 'video-react';
import '../../../node_modules/video-react/dist/video-react.css';
import { HeadArea,BodyArea,Slide,AreaCarosel,TitleCarosel,TutorialElement,TutorialTexto,TutorialTitle,TutorialTitletext,TutorialTextotext, Area} from './styles';
import Carousel from "react-elastic-carousel"


export class NLPTutorial extends Component {

    render() {
        return (
            <>
                <HeadArea>
                    <HeaderComponent/>
                </HeadArea>
                <BodyArea>
                    <TitleCarosel>Seja bem-vindo ao tutorial da NLEaser!</TitleCarosel>
                <AreaCarosel>
                    <Carousel>
                        <Slide>
                            Esta preste a perceber o quão fácil é usar o poder da tecnologia de processamento de linguagem natural.
                        </Slide>
                        <Slide>
                            Com um tutorial de menos de 5 minutos voce aprendera a usar esta ferramenta incrivel. 
                        </Slide>
                        <Slide>
                            <link rel="stylesheet" href="/css/video-react.css" />
                            <Player>
                                <source src="images/home/video.mp4" />
                            </Player>
                        </Slide>
                        
                    </Carousel>
                </AreaCarosel>
                </BodyArea>
                
                
            </>
        );
    }
}

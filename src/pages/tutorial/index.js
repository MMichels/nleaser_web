import React, { Component } from 'react';
import { HeaderComponent } from '../../components/Header';
import { Player } from 'video-react';
import '../../../node_modules/video-react/dist/video-react.css';
import { HeadArea,BodyArea,Slide,AreaCarosel,TitleCarosel,AreaVideo,TutorialElement,TutorialTexto,TutorialTitle,TutorialTitletext,TutorialTextotext, Area} from './styles';
import Carousel from "react-elastic-carousel"


export class NLPTutorial extends Component {

    render() {
        return (
            <>
                <HeadArea>
                    <HeaderComponent/>
                </HeadArea>
                <BodyArea>
                    <TitleCarosel>Tutorial da NLEaser!</TitleCarosel>
                <AreaCarosel>
                    <Carousel>
                        <Slide>
                            Com este tutorial você ira aprender a usar o poder da tecnologia de processamento de linguagem natural.
                        </Slide>
                        <Slide>
                            <AreaVideo>
                                <Player>
                                    <source src="images/home/video.mp4" />
                                </Player>
                            </AreaVideo>
                        </Slide>
                        
                    </Carousel>
                </AreaCarosel>
                </BodyArea>
                
                
            </>
        );
    }
}

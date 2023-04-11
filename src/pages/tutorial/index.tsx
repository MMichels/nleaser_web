import { Component } from 'react';
import { Container } from 'react-bootstrap';

import styles from './styles.module.scss'

export class NLPTutorial extends Component {

    render() {
        return (                
            <Container>
                <h1 className='text-center fw-bold text-white py-5'>Tutorial NLEaser</h1>
                <div className="bg-secondary bg-gradient bg-opacity-75 m-2 p-4">
                    <p className='text-white text-center fs-3'>
                        Uma rápida demonstração sobre como utilizar nossa ferramenta 
                    </p>
                    <video controls className={styles.videoPlayer + ' w-100'}>
                        <source src="images/home/video.mp4" />
                    </video>
                    
                </div>
            </Container>                
        );
    }
}

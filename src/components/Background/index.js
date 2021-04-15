import React from 'react'
import { BackgroundStyled } from './styles'; 

export const BackgroundComponent = function(props) {
    return (
        <BackgroundStyled>
            {props.children}            
        </BackgroundStyled>
    )
}

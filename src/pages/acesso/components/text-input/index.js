import React from 'react'

import {TextInputStyled} from './styles';

function TextinputComponent(props) {
    return (
        <TextInputStyled 
            type="text"
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )
}
export default TextinputComponent;


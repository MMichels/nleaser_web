import React from 'react';
import PropTypes from 'prop-types';
import { AccessFormStyled, DescriptionStyled, TitleStyled  } from './styles'

/**
 * Formulario padrão para realizar o cadastro e o login na aplicação
 */
const AccessFormComponent = function({title, description, onSubmit, ...props}) {
    return (
        <AccessFormStyled onSubmit={onsubmit}>
            {title && <TitleStyled>{title}</TitleStyled>}
            {description && <DescriptionStyled>{description}</DescriptionStyled>}
            {props.children}
        </AccessFormStyled>
    )
}

AccessFormComponent.propTypes = {
    title: PropTypes.string,        // Titulo do formulário
    description: PropTypes.string   // Pequena descrição que aparece entre o titulo e o primeiro input
}

export default AccessFormComponent;
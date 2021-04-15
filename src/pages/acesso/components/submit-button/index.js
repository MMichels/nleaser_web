import React from 'react';
import PropTypes from 'prop-types';
import {SubmitButtonStyled} from './styles';
import LoadingSpinnerComponent from "../../../../components/loading";

function SubmitButtonComponent({loading, text, ...props}) {
    return (
        <SubmitButtonStyled disabled={loading} onClick={() => props.onClick()}>
            {!loading && text}
            {loading && <LoadingSpinnerComponent />}
        </SubmitButtonStyled>
    )
}

SubmitButtonComponent.propTypes = {
    loading: PropTypes.bool.isRequired // Quando o valor for true, o botão fica desabilitado e exibe o gif de loading
}

export default SubmitButtonComponent
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoContainerStyled, LogoImgStyled } from "./styles";
import LogoImg from "../../assets/logo.png";

export const LogoComponent = function (props) {
    return (
        <LogoContainerStyled>
            <Link to="/">
                <LogoImgStyled className="logo-img" src={LogoImg} alt="Logo da aplicação NLEaser" />
            </Link>
            <p><b>Alpha</b></p>
            {props.children}
        </LogoContainerStyled>
    )
}

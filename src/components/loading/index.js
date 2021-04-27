import React from 'react';
import { LoadingSpinnerStyled } from "./styles";

import LoadingGif from "../../assets/gifs/loading.gif"

export function LoadingSpinnerComponent() {
    return (
        <LoadingSpinnerStyled src={LoadingGif} />
    )
}

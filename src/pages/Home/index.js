import React from 'react';
import { Link } from 'react-router-dom';

import { Layout_home} from "./styles";
import Header from "./Components/Header";
import CardIntroducao from './Components/CardIntroducao';
import CardBeneficios from './Components/CardBeneficios';
import CardMetodosHeader from './Components/CardMetodosHeader';
import CardsFerramentas from './Components/CardsFerramentas';
import Footer from "./Components/Footer";
import Topnav from "./Components/TopNav_rasponsive"

export default function Main() {
    return (
        <Layout_home>
                <Topnav/>
                <Header/>
                <CardIntroducao/>
                <CardBeneficios/>
                <CardMetodosHeader/>
                <CardsFerramentas/>
                <Footer/>
        </Layout_home>
    )
}

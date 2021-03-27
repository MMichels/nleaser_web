import React from 'react';
import { Link } from 'react-router-dom';

import { Layout_home} from "./styles";
import Header from "./Components/Header";
import CardIntroducao from './Components/CardIntroducao';
import CardBeneficios from './Components/Card-2';
import Card3 from './Components/Card-3';
import Card4 from './Components/Card-4';
import Footer from "./Components/Footer";
import Topnav from "./Components/TopNav_rasponsive"

export default function Main() {
    return (
        <Layout_home>
                <Topnav/>
                <Header/>
                <CardIntroducao/>
                <CardBeneficios/>
                <Card3/>
                <Card4/>
                <Footer/>
        </Layout_home>
    )
}

import { LayoutHome} from "./styles";
import { HeaderComponent } from "../../components/Header";
import { CardIntroducao } from './Components/CardIntroducao';
import { CardExplicacao } from './Components/CardExplicacao';
import { CardBeneficios } from './Components/CardBeneficios';
import { CardMetodos } from './Components/CardMetodosHeader';
import { CardsFerramentas } from './Components/CardsFerramentas';
import { Footer } from "./Components/Footer";
import { Container } from "react-bootstrap";

export const OldHome = function(props) {
    return (
        <LayoutHome>
            <HeaderComponent/>
            <CardIntroducao/>
            <CardExplicacao/>
            <CardBeneficios/>
            <CardMetodos/>
            <CardsFerramentas/>
            <Footer/>
        </LayoutHome>
    )
}


export const Home = function (props) {
    return (
        <Container>
            <HeaderComponent />

        </Container>
    )
}




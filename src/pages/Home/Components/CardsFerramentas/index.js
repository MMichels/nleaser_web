import React from 'react';
import { Container, TabsHeader, ButtonFerramenta, Box, ImgBox, TitleBox, TextBox } from "./styles";
import { Tabs, Tab, Panel } from '@bumaga/tabs'

// Importacao das imagens
import WordCloudImg from "../../../../assets/images/home/WordCloud.png";
import FrequenciaImg from "../../../../assets/images/home/frequencia.png";
import NgramsImg from "../../../../assets/images/home/Ngrams.png"
import EntidadesImg from "../../../../assets/images/home/entidade.jpeg"
import TfIdfImg from "../../../../assets/images/home/TF_IDF.png"
import Word2VecImg from "../../../../assets/images/home/word2vec.png"


const BtnFerramenta = (props) => {
    const [toggle, setToggle] = React.useState(true);

    return (
        <ButtonFerramenta
            onClick={() => setToggle(!toggle)}
            style={{ backgroundColor: toggle ? 'none' : '#446677' }}
        >
            {props.children}
        </ButtonFerramenta>
    )
}


export const CardsFerramentas = () => {
    return (
        <Container>
            <Tabs>
                <TabsHeader>
                    <Tab><BtnFerramenta>
                        Wordcloud
            </BtnFerramenta></Tab>
                    <Tab><BtnFerramenta>Frequência </BtnFerramenta></Tab>
                    <Tab><BtnFerramenta>Ngrams</BtnFerramenta></Tab>
                    <Tab><BtnFerramenta>Entidades</BtnFerramenta></Tab>
                    <Tab><BtnFerramenta>Relevancia</BtnFerramenta></Tab>
                    <Tab><BtnFerramenta>Similaridades</BtnFerramenta></Tab>
                </TabsHeader>
                <Panel>
                    <Box>
                        <TitleBox>Wordcloud</TitleBox>
                        <TextBox>
                            Uma nuvem de palavras é útil para visualizar respostas de texto não codificadas e perguntas com muitas categorias para exibir convenientemente em um gráfico de barras
                            ou uma tabela. A área ocupada por cada palavra / categoria é proporcional ao número de respondentes que deram aquela resposta. Uma nuvem de palavras mostrará apenas as
                            100 principais palavras / categorias.
                        </TextBox>
                        <ImgBox src={WordCloudImg}></ImgBox>
                    </Box>
                </Panel>
                <Panel>
                    <Box>
                        <TitleBox>Frequência</TitleBox>
                        <TextBox>
                            A método de frequência das palavras consiste em gerar um dicionário de palavras
                            que contabiliza a ocorrência de mesma em um determinado texto. Isso pode ser muito
                            útil para vários propósitos, desde a identificação de termos recorrentes em um conjunto
                            de análises de textos até a descoberta dequais são os problemas mais comuns nas
                            interações de suporte ao cliente.
                        </TextBox>
                        <ImgBox src={FrequenciaImg}></ImgBox>
                    </Box>
                </Panel>
                <Panel>
                    <Box>
                        <TitleBox>Ngrams</TitleBox>
                        <TextBox>
                            Os modelos estatísticos N-Gram são utilizados para a previsão de fala ou texto,
                            utilizando de propriedades estocásticas, que incorporam elementos do modelo de
                            Markov da ordem (n - 1) onde o modelo n será o elemento a ser previsto. Os modelos
                            N-Gram, são algoritmos relativamente simples e escaláveis, e permitem que com um
                            N maior tenhamos um maior a contabilidade da inferência. Entretendo, o valor dos
                            parâmetros a serem estimados aumenta exponencialmente em proporção a o n. Devido
                            a isso, geralmente são utilizados bigramas ou trigramas em sistemas dessa natureza.
                            </TextBox>
                        <ImgBox src={NgramsImg}></ImgBox>
                    </Box>
                </Panel>
                <Panel>
                    <Box>
                        <TitleBox>Entidades</TitleBox>
                        <TextBox>
                            A extração de entidades, também chamada de Named Entity Regognition (NER), a análise
                            de sentimento de um texto, para por exemplo, determinar se uma frase é um elogio ou
                            uma crítica, ou então a análise de relevância e semelhança entre palavras, que permite
                            verificar quais palavras ocorrem simultaneamente com mais frequência, ou então
                            identificar quão longe uma palavra está da outra.
                            </TextBox>
                        <ImgBox src={EntidadesImg}></ImgBox>
                    </Box>
                </Panel>
                <Panel>
                    <Box>
                        <TitleBox>Relevancia</TitleBox>
                        <TextBox>
                            O TF-IDF “term frequency-inverse document frequency” é um modelo de medida estatística
                            que tem como objetivo quantificar a relevância de uma determinada palavra para um corpus
                            (coleção de documentos). Para tal cálculo, se é multiplicando duas métricas: sendo a
                            primeira o número de vezes uma palavra ocorre em um documento e a segunda a frequência
                            inversa do documento em comparação ao corpus, de modo geral seria o quão frequente ou não
                            o termo é encontrado em todo o conjunto do corpus. Quanto maior a tendência do valor do
                            termo a 0, mais o mesmo é utilizado dentro do corpus.
                            </TextBox>
                        <ImgBox src={TfIdfImg}></ImgBox>
                    </Box>
                </Panel>
                <Panel>
                    <Box>
                        <TitleBox>Similaridades</TitleBox>
                        <TextBox>
                            O modelo estatístico Word2Vec foi desendivido pelo google em 2013, e tem como base uma rede
                            neural de duas camadas, que tem como entrada um corpus de texto e como saída é um conjunto
                            de vetores. Este conjunto é capaz de capturar o contexto de um termo em um documento, semelhança
                            semântica e sintática, relação com outras palavras, apenas tendo como base o treinamento.
                            </TextBox>
                        <ImgBox src={Word2VecImg}></ImgBox>
                    </Box>
                </Panel>
            </Tabs>
        </Container>
    )
}

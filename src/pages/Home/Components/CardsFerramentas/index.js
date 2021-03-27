import React from 'react';
import {Container, TabsHeader, ButtonFerramenta, Box,Img_Box,Title_box,Text_box} from "./styles";
import { Tabs, Tab, Panel } from '@bumaga/tabs' 



const CardsFerramentas = () => {

    const [toggle, setToggle] = React.useState(true);

    return (
    <Container>
    <Tabs>
        <TabsHeader>
            <Tab><ButtonFerramenta onClick={e => setToggle(state => !state)}>
                Wordcloud
            </ButtonFerramenta></Tab>
            <Tab><ButtonFerramenta onClick={e => setToggle(state => !state)}>Frequência </ButtonFerramenta></Tab>
            <Tab><ButtonFerramenta onClick={e => setToggle(state => !state)}>Ngrams</ButtonFerramenta></Tab>
            <Tab><ButtonFerramenta onClick={e => setToggle(state => !state)}>Entidades</ButtonFerramenta></Tab>
            <Tab><ButtonFerramenta onClick={e => setToggle(state => !state)}>Relevancia</ButtonFerramenta></Tab>
            <Tab><ButtonFerramenta onClick={e => setToggle(state => !state)}>Similaridades</ButtonFerramenta></Tab>
        </TabsHeader>    
            <Panel>
                <Box>
                   <Title_box>Wordcloud</Title_box>
                        <Text_box>
                            Uma nuvem de palavras é útil para visualizar respostas de texto não codificadas e perguntas com muitas categorias para exibir convenientemente em um gráfico de barras
                            ou uma tabela. A área ocupada por cada palavra / categoria é proporcional ao número de respondentes que deram aquela resposta. Uma nuvem de palavras mostrará apenas as 
                            100 principais palavras / categorias.
                        </Text_box>
                    <Img_Box src='WordCloud.png'></Img_Box>                
                </Box>
            </Panel>
            <Panel>
                <Box>
                   <Title_box>Frequancia</Title_box>
                        <Text_box>
                            A método de frequência das palavras consiste em gerar um dicionário de palavras 
                            que contabiliza a ocorrência de mesma em um determinado texto. Isso pode ser muito 
                            útil para vários propósitos, desde a identificação de termos recorrentes em um conjunto 
                            de análises de textos até a descoberta dequais são os problemas mais comuns nas 
                            interações de suporte ao cliente.
                        </Text_box>
                    <Img_Box src='frequencia.png'></Img_Box>                
                </Box>
            </Panel>
            <Panel>
                <Box>
                    <Title_box>Ngrams</Title_box>
                            <Text_box>
                                Os modelos estatísticos N-Gram são utilizados para a previsão de fala ou texto, 
                                utilizando de propriedades estocásticas, que incorporam elementos do modelo de 
                                Markov da ordem (n - 1) onde o modelo n será o elemento a ser previsto. Os modelos
                                N-Gram, são algoritmos relativamente simples e escaláveis, e permitem que com um 
                                N maior tenhamos um maior a contabilidade da inferência. Entretendo, o valor dos 
                                parâmetros a serem estimados aumenta exponencialmente em proporção a o n. Devido
                                a isso, geralmente são utilizados bigramas ou trigramas em sistemas dessa natureza.
                            </Text_box>
                        <Img_Box src='Ngrams.png'></Img_Box>                
                    </Box>
            </Panel>
            <Panel>
                <Box>
                    <Title_box>Entidades</Title_box>
                            <Text_box>
                                A extração de entidades, também chamada de Named Entity Regognition (NER), a análise
                                de sentimento de um texto, para por exemplo, determinar se uma frase é um elogio ou 
                                uma crítica, ou então a análise de relevância e semelhança entre palavras, que permite
                                verificar quais palavras ocorrem simultaneamente com mais frequência, ou então 
                                identificar quão longe uma palavra está da outra.
                            </Text_box>
                        <Img_Box src='entidades.jpeg'></Img_Box>                
                    </Box>
            </Panel>
            <Panel>
                <Box>
                    <Title_box>Relevancia</Title_box>
                            <Text_box>
                                O TF-IDF “term frequency-inverse document frequency” é um modelo de medida estatística 
                                que tem como objetivo quantificar a relevância de uma determinada palavra para um corpus 
                                (coleção de documentos). Para tal cálculo, se é multiplicando duas métricas: sendo a 
                                primeira o número de vezes uma palavra ocorre em um documento e a segunda a frequência 
                                inversa do documento em comparação ao corpus, de modo geral seria o quão frequente ou não 
                                o termo é encontrado em todo o conjunto do corpus. Quanto maior a tendência do valor do 
                                termo a 0, mais o mesmo é utilizado dentro do corpus.
                            </Text_box>
                        <Img_Box src='TF_IDF.png'></Img_Box>                
                    </Box>
            </Panel>
            <Panel>
                <Box>
                    <Title_box>Similaridades</Title_box>
                            <Text_box>
                                O modelo estatístico Word2Vec foi desendivido pelo google em 2013, e tem como base uma rede 
                                neural de duas camadas, que tem como entrada um corpus de texto e como saída é um conjunto 
                                de vetores. Este conjunto é capaz de capturar o contexto de um termo em um documento, semelhança 
                                semântica e sintática, relação com outras palavras, apenas tendo como base o treinamento.
                            </Text_box>
                        <Img_Box src='word2vec.png'></Img_Box>                
                    </Box>
            </Panel>
    </Tabs>
  </Container>
    )
}

export default CardsFerramentas;
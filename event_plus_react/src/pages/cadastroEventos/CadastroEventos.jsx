import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista";
import Banner from "../../assets/img/banner_cadastro_evento.svg"
import { useState } from "react"

const CadastroEventos = () => {
    const [evento, setEvento] = useState("");
    const [dataEvento, setDataEvento] = useState("");
    const [tipoEvento, setTipoEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instituicao, setInstuicao] = useState("1A964BD7-0DA8-420F-98D7-32925563FDED");


    return (
        <>
            <Header />
            <Cadastro
                //titulo
                tituloCadastro="Cadastro de Evento"

                //imagem
                img_banner={Banner}

                //primeiro input
                nomes="Nome"
                valorInput={evento}
                setValorInput={setEvento}

                //segundo input
                setValorDate={setDataEvento}
                valorDate={dataEvento}

                //terceiro input 
                valorSelect={tipoEvento}
                setValorSelect={setTipoEvento}

                //quarto input 
                valorSelect1={instituicao}
                setValorSelect1={setInstuicao}

                //quinto input 
                setValorText={setDescricao}
                valorText={descricao}
            />

            <Lista
                tituloLista="LISTA DE EVENTO"
                titulo="Nome"

            />
            <Footer />
        </>
    )
}

export default CadastroEventos;

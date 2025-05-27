import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista";
import Banner from "../../assets/img/banner_cadastro_evento.svg"

const CadastroEventos = () => {
    return (
        <>
            <Header/>
                <Cadastro
                tituloCadastro = "Cadastro de Evento"
                img_banner = {Banner}
                nomes = "Nome"
                
                />

                <Lista 
                    tituloLista ="LISTA DE EVENTO"
                    titulo = "Nome"
                
                />
            <Footer/>
        </>
    )
}

export default CadastroEventos;

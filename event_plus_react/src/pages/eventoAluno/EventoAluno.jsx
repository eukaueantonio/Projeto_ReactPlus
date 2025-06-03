import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/Comentario.png"
import Informacao from "../../assets/img/Informacao.png"
import "./EventoAluno.css"
import { use, useEffect, useState } from "react";
import api from "../../Services/services"
import { format } from "date-fns";
import Modal from "../../components/modal/Modal";



const EventoAluno = () => {

    const [listaEventos, setListaEventos] = useState([]);

    async function listarEventos() {
        try {
            const resposta = await api.get("Evento");
            setListaEventos(resposta.data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEventos()
    }, [])

    return (

        //Aqui voce vai chamar o header
        <>
            <Header />

            {/* //Comecando a listagem */}
            <main className="main_lista_eventos layout-grid">
                <div className="titulo">
                    <h1>Eventos</h1>
                    <hr />
                </div>
                <select name="" id="">
                    <option value="" selected>Todos os eventos</option>
                </select>
                <table className="tabela_lista_eventos">
                    <thead>
                        <tr className="th_lista_eventos">
                            <th>Título</th>
                            <th>Data do Evento</th>
                            <th>Tipo Evento</th>
                            <th>Descrição</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaEventos.length > 0 ? (
                            listaEventos.map((item) => (
                                <tr>
                                    <td>{item.nomeEvento}</td>
                                    <td>{format(item.dataEvento, "dd/MM/yy")}</td>
                                    <td>{item.tiposEvento.tituloTipoEvento}</td>
                                    <td>
                                        <button className="icon">
                                            <img src={Informacao} alt="" />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="icon">
                                            <img src={Comentario} alt="" />
                                        </button>
                                    </td>
                                    <td>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>Não existe eventos cadastrados.</p>
                        )}
                    </tbody>
                </table>
            </main>

            {/* //Aqui voce vai chamar o footer */}
            <Footer />
            <Modal />
        </>
    )
}

export default EventoAluno;
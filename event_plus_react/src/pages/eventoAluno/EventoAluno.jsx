import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/Comentario.png"
import Informacao from "../../assets/img/Informacao.png"
import "./EventoAluno.css"
import { use, useEffect, useState } from "react";
import api from "../../Services/services"
import { format } from "date-fns";
import Modal from "../../components/modal/Modal";
import Toggle from "../../components/toggle/Toggle";
import Swal from "sweetalert2";



const EventoAluno = () => {

    const [listaEventos, setListaEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    //"descricaoEvento" ou "comentario"
    const [dadosModal, setDadosModal] = useState([]);
    //descricao, idEvento, etc...
    const [modalAberto, setModalAberto] = useState(false);
    const [filtroData, setFiltroData] = useState(["todos"]);
    const [usuarioId, setUsuarioId] = useState("D479E299-39BA-45CD-C9C0-08DDA4391B48");

    async function listarEventos() {
        try {
            //pego os eventos em geral
            const eventoListado = await api.get("Evento");
            const todosOsEventos = eventoListado.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);


                return {
                    //as informacoes tanto de eventos, quanto de eventos que possuem presenca
                    ...atualEvento, //mantem os dados originais do evento 
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListaEventos(eventosComPresencas);
            console.log(`informacoes de todos os evento:`);
            console.log(todosOsEventos);

            console.log(`informacoes de eventos com presenca:`);
            console.log(minhasPresencas);

            console.log(`informacoes de todos os evento com presenca:`);
            console.log(eventosComPresencas);

        } catch (error) {
            console.log(error);

        }
    }

    function abrirModal(tipo, dados) {
        //tipo de modal 
        //dados
        setModalAberto(true)
        setDadosModal(tipo)
        setTipoModal(dados)
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca != "") {
                //atualizacao da situacao para false
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false })
                Swal.fire('Removido!', 'Sua presença foi confirmada.', 'success')
            } else if (idPresenca != "") {
                //atualozacao para true
                await api.put(`PresencasEventos/${idPresenca}`,
                    { situacao: true })
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success')
            } else {
                //cadastrar uma nova presenca 
                await api.post("PresencasEventos", { situacao: true, idUsuario: usuarioId, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success')

            }
            listarEventos();
        } catch (error) {
            console.log(error)
        }
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true;
            if (filtroData.includes("passados") && dataEvento < hoje) return true;

            return false;
        });
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
                <select onChange={(e) => setFiltroData([e.target.value])}>
                    <option value="todos" selected>Todos os eventos</option>
                    <option value="futuros">Somente futuros</option>
                    <option value="passados">Somente passados</option>
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
                            filtrarEventos() && filtrarEventos().map((item) => (
                                <tr>
                                    <td>{item.nomeEvento}</td>
                                    <td>{format(item.dataEvento, "dd/MM/yy")}</td>
                                    <td>{item.tiposEvento.tituloTipoEvento}</td>
                                    <td>
                                        <button className="icon" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}>
                                            <img src={Informacao} alt="" />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="icon" onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}>
                                            <img src={Comentario} alt="" />
                                        </button>
                                    </td>
                                    <td>
                                        <Toggle
                                            presenca={item.possuiPresenca}
                                            manipular={() => manipularPresenca = (item.idEvento, item.possuiPresenca, item.idPresenca)}
                                        />
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
            {/* <Footer /> */}
            {modalAberto && (
                <Modal
                    titulo={
                        tipoModal == "descricaoEvento" 
                        ? "Descrição do evento:" 
                        : "Comentário"
                    }
                    //estou vereficando qual eh o tipo de moda!
                    tipoModel={tipoModal}

                    idEvento={dadosModal.idEvento}

                    descricao={dadosModal.descricao}

                    fecharModal={fecharModal} />
            )}
        </>
    )
}

export default EventoAluno;
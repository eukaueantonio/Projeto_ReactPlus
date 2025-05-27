import "./Lista.css";
import Editar from "../../assets/img/lapis.svg";
import Excluir from "../../assets/img/lixeira.svg";

const Lista = (props) => {
    return (
        <>
            <section className="lista">
                <h1>{`${props.tituloLista}`}</h1>
                <hr className="linha_titulo" />

                <div className="tabela layout_grid">
                    <table>
                        <thead>
                            <tr className="tabela_cabecalho">
                                <th className="left">{props.titulo}</th>
                                {/* <th className="left" style={{ display: props.visibilidade }}>Tipo de Evento</th> */}
                                <th className="right">Editar</th>
                                <th className="right">Deletar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.listaTipoEvento && props.listaTipoEvento.length > 0 ? (
                                props.listaTipoEvento.map((item) => (
                                    <tr className="item_lista" key={item.idTipoEvento}>
                                        <td data-cell="Nome" className="left">{item.tituloTipoEvento} {item.tituloTipoUsuario}</td>
                                        <td data-cell="Editar" className="botao_edicao right">
                                            <img src={Editar}
                                                alt="Caneta"
                                                onClick={() => props.editarTipoEvento(item)}
                                                style={{ cursor: "pointer "}} />
                                        </td>
                                        <td data-cell="Excluir" className="right">
                                            <img
                                                src={Excluir}
                                                alt="Lixeira"
                                                onClick={() => (props.excluirTipoEvento(item))}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="nadaCadastrado">Nada cadastrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </section>

        </>
    )
}


export default Lista;
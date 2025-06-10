import "./Modal.css";
import Lixeira from "../../assets/img/lixeira.svg";
import { useEffect, useState } from "react";
import api from "../../Services/services"



const Modal = (props) => {

    const [comentarios, setComentarios] = useState([]);
    const [usuarioId, setUsuarioId] = useState("D479E299-39BA-45CD-C9C0-08DDA4391B48");
    const [novoComentario, setNovoComentario] = useState("");


    async function listarComentarios() {
        try {
            const resposta = await api.get(`Comentario/ListarSomenteExibe?id=${props.idEvento}`);
            setComentarios(resposta.data);
        } catch (error) {
            console.log(error);

        }
    }

    async function cadastrarComentario(comentario) {
        try {
            await api.post("Comentario",
            {idUsuario: usuarioId,
            idEvento: props.idEvento,
            descricao: comentario})
        } catch (error) {
            console.log(error)
        }
    }

    async function deletarComentario(idComentarioEvento) {
        try {
            await api.delete(`Comentario/${idComentarioEvento}`);
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(() => {
        listarComentarios();
    }, [comentarios])

    return (
        <>
            <div className="model-overplay" onClick={props.fecharModal}></div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModel === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={Lixeira} alt="Deletar" 
                                    onClick={()=> deletarComentario(item.idComentarioEvento)}/>
                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input type="text" placeholder="Escreva seu comentário..." value={novoComentario} onChange={(e) =>setNovoComentario(e.target.value)} />
                                <button onClick={() => cadastrarComentario()}>
                                    Cadastrar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>

    )
}

export default Modal;
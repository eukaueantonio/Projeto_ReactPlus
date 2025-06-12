import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import TipoEventos from "../pages/tipoEventos/TipoEventos";
import TipoUsuarios from "../pages/tipoUsuarios/TipoUsuarios";
import CadastroEventos from "../pages/cadastroEventos/CadastroEventos";
import EventoAluno from "../pages/eventoAluno/EventoAluno";
import { useAuth } from "../contexts/AuthContext";

const Privado = (props) => {
    const {usuario} = useAuth();
    // toke. idUsuario, tipoUsuario

    // Se nao estiver autenticado, manda para login
    if(!usuario) {
        return <Navigate to="/"/>;
    }
    // Se o tipo do usuario nao for permitido, bloqueia
    if(usuario.tipoUsuario !== props.tipoPermitido){ 
        // ir para a tela de nao encontrado!
    return <Navigate to="/"/>;}
    // senao, renderiza o componente passado
    return <props.item/> 
};

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/TipoEventos"
                    element={<Privado tipoPermitido="admin" item={TipoEventos} />}
                />
                <Route
                    path="/TipoUsuarios"
                    element={<Privado tipoPermitido="admin" item={TipoUsuarios} />}
                />
                <Route
                    path="/CadastroEventos"
                    element={<Privado tipoPermitido="admin" item={CadastroEventos} />}
                />
                <Route
                    path="/EventoAluno"
                    element={<Privado tipoPermitido="aluno" item={EventoAluno} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;

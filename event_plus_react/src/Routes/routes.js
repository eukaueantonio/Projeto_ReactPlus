import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import TipoEventos from "../pages/tipoEventos/TipoEventos";
import TipoUsuarios from "../pages/tipoUsuarios/TipoUsuarios";
import CadastroEventos from "../pages/cadastroEventos/CadastroEventos";
import EventoAluno from "../pages/eventoAluno/EventoAluno";
import { useAuth } from "../contexts/AuthContext";

// Componente de rota privada
const Privado = ({ item: Item, tipoPermitido }) => {
    const { usuario } = useAuth();

    // Se não estiver autenticado, redireciona para o login
    if (!usuario) {
        return <Navigate to="/" />;
    }

    // Se o tipo de usuário não for o permitido, redireciona para o login
    if (usuario.tipoUsuario !== tipoPermitido) {
        return <Navigate to="/" />;
    }

    // Senão, renderiza o componente passado
    return <Item />;
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

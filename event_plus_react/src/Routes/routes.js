import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoEventos from "../pages/tipoEventos/TipoEventos";
import TipoUsuarios from "../pages/tipoUsuarios/TipoUsuarios";
import CadastroEventos from "../pages/cadastroEventos/CadastroEventos";
import Listagem from "../pages/listagem/Listagem";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                  <Route path="/" element={<Login/>} exact/>
                  <Route path="/TipoEventos" element={<TipoEventos/>}/>
                  <Route path="/TipoUsuarios" element={<TipoUsuarios/>}/>
                  <Route path="/CadastroEventos" element={<CadastroEventos/>}/>
                  <Route path="/Listagem" element={<Listagem/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
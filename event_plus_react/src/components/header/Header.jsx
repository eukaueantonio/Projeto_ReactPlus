import "./Header.css";
import Logo1 from "../../assets/img/logo1.svg"
import Admin from "../../assets/img/admin.png"
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                <Link to="/">
                    <img src={Logo1} alt="Logo do Events" />
                </Link>
                <nav className="nav_header">
                    <Link to="/TipoEventos" className="link_header" href="">Home</Link>
                    <Link to="/CadastroEventos" className="link_header" href="">Eventos</Link>
                    <Link to="/TipoUsuarios" className="link_header" href="">Usuários</Link>
                    <Link to="/Contatos" className="link_header" href="">Contatos</Link>
                </nav>

                <nav className="nav_header admin">
                    <Link to="/Administrador" className="link_header" href="">Administrador</Link>
                    <img src={Admin} alt="" className="Admin IMG" />
                </nav>

            </div>
        </header>
    )
}
export default Header;
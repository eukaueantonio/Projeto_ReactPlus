import Botao from "../../components/botao/Botao.jsx";
import Logo from "../../assets/img/logo1.svg";
import Banner from "../../assets/img/fundo_login.svg";
import "./Login.css";

const Login = () => {
    return (
        <main className="main">
            <div className="banner">
                <img src={Banner} alt ="Banner do fundo do Login"/>
            </div>

            <section className="section_login">
                <img src={Logo} alt="Logo do Event" />
                <form action="" className="form_login">

                    <div className="campos_login">
                        <div className="campo_imput">
                            <label htmlFor="email"></label>
                            <input className="email"type="email" name="email" placeholder="Username"/>

                        </div>
                        <div className="campo_imput">
                            <label htmlFor="senha"></label>
                            <input type="password" name="senha" placeholder="Password" />

                        </div>
                    </div>
                        <h3 className="mudar_senha">Esqueceu a senha?</h3>
                        <Botao nomeBotao="Login"/>
                </form>
            </section>
        </main>
    )
}

export default Login;
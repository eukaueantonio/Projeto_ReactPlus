import Botao from "../../components/botao/Botao.jsx";
import Logo from "../../assets/img/logo1.svg";
import Banner from "../../assets/img/fundo_login.svg";
import "./Login.css";
import api from "../../Services/services"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { userDecodeToken } from "../../auth/Auth.js";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function realizarAutenticacao(e) {
    e.preventDefault();

    const usuario = {
        email: email,
        senha: senha
    };

    if (senha.trim() != "" || email.trim() != "") {
        try {
            const resposta = await api.post("Login", usuario);
            const token = resposta.data.token;

            if (token) {
                const tokenDecodificado = userDecodeToken(token);
                secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                if (tokenDecodificado.tipoUsuario === "Comum") {
                    navigate("/Eventos");
                } else {
                    navigate("/CadastroEventos");
                }
            }
        } catch (error) {
            console.log(error);
            alertar("error", "Email e/ou senha inválidos");
        }
    } else {
        alertar("error", "Preencha os campos vazios para realizar o login!");
    }
}


    return (
        <main className="main">
            <div className="banner">
                <img src={Banner} alt="Banner do fundo do Login" />
            </div>

            <section className="section_login">
                <img src={Logo} alt="Logo do Event" />
                <form action="" className="form_login" onSubmit={realizarAutenticacao}>

                    <div className="campos_login">
                        <div className="campo_imput">
                            <label htmlFor="email"></label>
                            <input className="email" type="email" name="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className="campo_imput">
                            <label htmlFor="senha"></label>
                            <input type="password" name="senha" placeholder="Password" value={senha} onChange={(e) => setSenha(e.target.value)} />

                        </div>
                    </div>
                    <h3 className="mudar_senha">Esqueceu a senha?</h3>
                    <Botao nomeBotao="Login" />
                </form>
            </section>
        </main>
    )
}

export default Login;
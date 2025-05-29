import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/banner_tipo_usuarios.svg";
import Lista from "../../components/lista/Lista";
import {useState, useEffect } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'


const TipoUsuarios = () => {

    const[tipoUsuario, setTipoUsuario] = useState("")
    const[listaTipoUsuario, setListaTipoUsuario] = useState([])

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

    async function cadastrarTipoUsuario(e) {
        e.preventDefault();
        if(tipoUsuario.trim !== "") {
            try {
                await api.post("tipoUsuario", { tituloTipoUsuario: tipoUsuario})
                alertar("success", "sucesso! Cadastro realizado")
                setTipoUsuario("")
            } catch (error) {
                alertar("error", "Erro! preencha os campos")
                console.log(error);
            }
        } else {
            alertar("error", "Erro! preencha os campos")
        }
        
    }

    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("TipoUsuario")
            console.log(resposta.data)
            setListaTipoUsuario(resposta.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function editarTipoUsuario(tiposUsuarios) {
        const { value : novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu tipo de usuário", 
            input: "text",
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            inputLabel: "Novo tipo de usuário:",
            inputValue: tiposUsuarios.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if(!value) {
                    return "O campo não pode estar vazio!"
                }
            }
        })
        if(novoTipoUsuario) {
            try {
                await api.put(`TipoUsuario/${tiposUsuarios.idTipoUsuario}`,
                    { TituloTipoUsuario : novoTipoUsuario})
                alertar("success", "Tipo de usuário modificado!")
            } catch (error) {
                
            }
            Swal.fire(`Seu novo tipo de usuário: ${novoTipoUsuario}`)
        }
    }   

    async function excluirTipoUsuario(id) {
        const result = await Swal.fire({
            title: "Você tem certeza que quer excluir?",
            text: "Você não vai poder reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar isso!"
        })

        if (result.isConfirmed) {
            try {
                console.log("ID enviado para deletar:", id)
                await api.delete(`TipoUsuario/${id.idTipoUsuario}`)
                alertar("success", "Deletado com sucesso!")
                listarTipoUsuario()
            } catch (error) {
                console.error("Erro ao deletar:", error.response || error)
                alertar("error", "Erro ao deletar.")
            }
        }
    }

    useEffect(() => {
        listarTipoUsuario()
    }, [listaTipoUsuario])


    return (
        <>
            <Header />
            <Cadastro
                tituloCadastro="Cadastro Tipo de Usuário"
                img_banner={Banner}
                nomes="Título"
                visibilidade="none"
                textoBotao="Cadastrar"
                funcCadastroTipoEvento={cadastrarTipoUsuario}
                valorInput={tipoUsuario}
                setValorInput={setTipoUsuario}
                visivel="none"
            />
             <Lista 
                   tituloLista ="LISTA TIPO DE USUÁRIO"
                   titulo = "Título"
                   visibilidade ="table-cell"
                   listaTipoEvento={listaTipoUsuario}
                   editarTipoEvento={editarTipoUsuario}
                   excluirTipoEvento={excluirTipoUsuario}

            />
            <Footer />
        </>
    )
}

export default TipoUsuarios;
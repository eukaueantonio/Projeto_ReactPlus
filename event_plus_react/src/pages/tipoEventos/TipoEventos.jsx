import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/banner_tipo_eventos.svg";
import Lista from "../../components/lista/Lista";
import api from "../../Services/services";
import Swal from 'sweetalert2'

const TipoEventos = () => {

    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([])

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

    async function cadastrarTipoEvento(e) {
        e.preventDefault();
        if (tipoEvento.trim() !== "") {

            try {
                await api.post("tipoEvento", { tituloTipoEvento: tipoEvento });
                alertar("success", "sucesso! Cadastro realizado")
                setTipoEvento("");

            } catch (error) {
                alertar("error", "Erro! preencha os campos")
                console.log(error);

            }

        } else {
            alertar("error", "Erro! preencha os campos")
        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TipoEvento");
            console.log(resposta.data);
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function excluirTipoEvento(id) {
        const result = await Swal.fire({
            title: "Você tem certeza que quer excluir?",
            text: "Você não vai poder reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar isso!"
        });

        if (result.isConfirmed) {
            try {
                console.log("ID enviado para deletar:", id);
                await api.delete(`TipoEvento/${id.idTipoEvento}`);
                alertar("success", "Deletado com sucesso!");
                listarTipoEvento();
            } catch (error) {
                console.error("Erro ao deletar:", error.response || error);
                alertar("error", "Erro ao deletar.");
            }
        }
    }

    async function editarTipoEvento(tiposEventos) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Modifique seu tipo de evento",
            input: "text",
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            inputLabel: "Novo tipo de evento",
            inputValue: tiposEventos.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoTipoEvento) {
            try {
                await api.put(`TipoEvento/${tiposEventos.idTipoEvento}`,
                    { TituloTipoEvento: novoTipoEvento });
                alertar("success", "Tipo de evento modificado!")
            } catch (error) {

            }
            Swal.fire(`Seu novo tipo de evento: ${novoTipoEvento}`);
        }
    }

     useEffect(() => {
        listarTipoEvento();
    }, [listaTipoEvento])

    return (
        <>
            <Header />
            <Cadastro
                tituloCadastro="Cadastro Tipo de Eventos"
                img_banner={Banner}
                nomes="Título"
                visibilidade="none"
                textoBotao="Cadastrar"
                funcCadastroTipoEvento={cadastrarTipoEvento}
                valorInput={tipoEvento}
                setValorInput={setTipoEvento}
            />
            <Lista
                tituloLista="LISTA TIPO DE EVENTOS"
                titulo="Título"
                visibilidade="table-cell"
                listaTipoEvento={listaTipoEvento}
                excluirTipoEvento={excluirTipoEvento}
                editarTipoEvento={editarTipoEvento}
            />
            <Footer />
        </>
    )
}

export default TipoEventos;